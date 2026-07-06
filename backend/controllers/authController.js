const authService = require("../services/authService");

const registerUser = async (req, res) => {
    console.log("========== REGISTER HIT ==========");
    console.log(req.body);

    try {
        const result = await authService.register(req.body);

        return res.status(201).json({
            success: true,
            ...result,
        });
    } catch (error) {
        console.error("REGISTER ERROR:");
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
            error,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const result = await authService.login(req.body);

        return res.status(200).json({
            success: true,
            ...result,
        });
    } catch (error) {
        console.error("LOGIN ERROR:");
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
            error,
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
};