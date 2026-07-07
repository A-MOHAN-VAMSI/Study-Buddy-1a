const mysql = require("mysql2/promise");
require("dotenv").config();
console.log(process.env.DB_HOST);
console.log(process.env.DB_PORT);
console.log(process.env.DB_USER);
console.log(process.env.DB_NAME);

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
});

(async () => {
    try {
        const connection = await pool.getConnection();

        console.log("✅ USING THIS DB CONFIG");

        const [host] = await connection.query("SELECT @@hostname AS host");
        console.log("HOST:", host);

        const [port] = await connection.query("SELECT @@port AS port");
        console.log("PORT:", port);

        const [db] = await connection.query("SELECT DATABASE() AS db");
        console.log("DATABASE:", db);

        const [tables] = await connection.query("SHOW TABLES");
        console.log("TABLES:", tables);

        const [count] = await connection.query(
            "SELECT COUNT(*) AS total FROM users"
        );
        console.log("COUNT:", count);

        connection.release();
    } catch (err) {
        console.error(err);
    }
})();

module.exports = pool;