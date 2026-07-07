// setup.js — one-time database bootstrap script
// Run: node setup.js  (from backend/ folder)
// Safe: uses CREATE TABLE IF NOT EXISTS and CREATE DATABASE IF NOT EXISTS — no drops.

require("dotenv").config();
const mysql = require("mysql2/promise");

const {
    DB_HOST = "localhost",
    DB_PORT = 3306,
    DB_USER = "root",
    DB_PASSWORD = "",
    DB_NAME = "study_buddy"
} = process.env;

async function run() {
    // Connect without specifying a database so we can CREATE the DB itself
    const conn = await mysql.createConnection({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD
    });

    console.log("✅ Connected to MySQL");

    // 1. Create database
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
    console.log(`✅ Database '${DB_NAME}' ensured`);

    // 2. Switch to it
    await conn.query(`USE \`${DB_NAME}\``);

    // 3. Show existing tables
    const [tableRows] = await conn.query("SHOW TABLES");
    const existing = tableRows.map(r => Object.values(r)[0]);
    console.log("\n📋 Existing tables:", existing.length ? existing.join(", ") : "(none)");

    // ---------------------------------------------------------------
    // CORE TABLES (real schema — derived directly from service files)
    // ---------------------------------------------------------------

    // users — fields: id, name, email, password, role
    // Source: authService.js lines 7,23-24,55-57,68-71
    await conn.query(`
        CREATE TABLE IF NOT EXISTS users (
            id        INT AUTO_INCREMENT PRIMARY KEY,
            name      VARCHAR(100) NOT NULL,
            email     VARCHAR(150) NOT NULL UNIQUE,
            password  VARCHAR(255) NOT NULL,
            role      ENUM('student','admin') NOT NULL DEFAULT 'student',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
    console.log("✅ Table 'users' ensured");

    // exams — fields: id, title, description, duration, total_marks, start_time, end_time, created_by
    // Source: examService.js lines 4-12,15-17; studentService.js lines 6-13
    await conn.query(`
        CREATE TABLE IF NOT EXISTS exams (
            id          INT AUTO_INCREMENT PRIMARY KEY,
            title       VARCHAR(200) NOT NULL,
            description TEXT,
            duration    INT,
            total_marks INT,
            start_time  DATETIME,
            end_time    DATETIME,
            created_by  INT,
            created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
    console.log("✅ Table 'exams' ensured");

    // questions — fields: id, exam_id, question, option_a/b/c/d, correct_answer, marks
    // Source: questionService.js lines 4-11,14-16; studentService.js lines 24-31,59
    await conn.query(`
        CREATE TABLE IF NOT EXISTS questions (
            id             INT AUTO_INCREMENT PRIMARY KEY,
            exam_id        INT NOT NULL,
            question       TEXT NOT NULL,
            option_a       VARCHAR(255),
            option_b       VARCHAR(255),
            option_c       VARCHAR(255),
            option_d       VARCHAR(255),
            correct_answer VARCHAR(10) NOT NULL,
            marks          INT NOT NULL DEFAULT 1,
            FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE
        )
    `);
    console.log("✅ Table 'questions' ensured");

    // ---------------------------------------------------------------
    // RESULTS MODULE TABLES (exact schema confirmed by user)
    // ---------------------------------------------------------------

    // results — fields: id, student_id, exam_id, score, percentage, submitted_at
    // Source: studentService.js lines 78-87; resultService.js
    await conn.query(`
        CREATE TABLE IF NOT EXISTS results (
            id           INT AUTO_INCREMENT PRIMARY KEY,
            student_id   INT NOT NULL,
            exam_id      INT NOT NULL,
            score        INT,
            percentage   FLOAT,
            submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
    console.log("✅ Table 'results' ensured");

    // student_answers — fields: id, student_id, question_id, selected_answer
    // Source: studentService.js lines 46-55
    await conn.query(`
        CREATE TABLE IF NOT EXISTS student_answers (
            id              INT AUTO_INCREMENT PRIMARY KEY,
            student_id      INT NOT NULL,
            question_id     INT NOT NULL,
            selected_answer VARCHAR(10)
        )
    `);
    console.log("✅ Table 'student_answers' ensured");

    // 4. Confirm final table list
    const [finalTables] = await conn.query("SHOW TABLES");
    const names = finalTables.map(r => Object.values(r)[0]);
    console.log("\n📋 Tables after setup:", names.join(", "));

    // 5. Seed: insert 1 exam if exams table is empty (needed so results FK points to something real)
    const [[{ examCount }]] = await conn.query("SELECT COUNT(*) AS examCount FROM exams");
    if (examCount === 0) {
        await conn.query(`
            INSERT INTO exams (title, description, duration, total_marks, start_time, end_time, created_by)
            VALUES ('Java Programming Test', 'Basic Java MCQ Test', 60, 20, NOW(), DATE_ADD(NOW(), INTERVAL 2 HOUR), 1)
        `);
        console.log("\n🌱 Seeded 1 exam (id=1) into 'exams'");
    }

    // 6. Insert 3 test results for exam_id=1 (mix of pass/fail at 40% threshold)
    const [[{ resultCount }]] = await conn.query(
        "SELECT COUNT(*) AS resultCount FROM results WHERE exam_id = 1"
    );
    if (resultCount === 0) {
        await conn.query(`
            INSERT INTO results (student_id, exam_id, score, percentage) VALUES
                (101, 1, 18, 90),
                (102, 1,  7, 35),
                (103, 1, 12, 60)
        `);
        console.log("🌱 Seeded 3 test rows into 'results' for exam_id=1 (pass:90%, fail:35%, pass:60%)");
    } else {
        console.log(`ℹ️  results already has ${resultCount} row(s) for exam_id=1 — skipped seed`);
    }

    await conn.end();
    console.log("\n🎉 Setup complete. Run 'npm start' to start the backend.\n");
}

run().catch(err => {
    console.error("\n❌ Setup failed:", err.message);
    process.exit(1);
});
