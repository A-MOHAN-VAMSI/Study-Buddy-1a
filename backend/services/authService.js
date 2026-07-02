const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// Register User
const register = async (userData) => {
    const { name, email, password, role } = userData;

    const [existingUser] = await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    if (existingUser.length > 0) {
        throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
        "INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)",
        [name, email, hashedPassword, role]
    );

    return {
        message: "User Registered Successfully"
    };
};

// Login User
const login = async (userData) => {
    const { email, password } = userData;

    const [users] = await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    if (users.length === 0) {
        throw new Error("User not found");
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid Password");
    }

    const token = jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    return {
        message: "Login Successful",
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};

module.exports = {
    register,
    login
};