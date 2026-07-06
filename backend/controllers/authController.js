const authService = require("../services/authService");
const registerUser = async (req, res) => {
    try {
        const result = await authService.register(req.body);

        res.status(201).json({
            success: true,
            ...result
        });
    } catch (error) {
    console.error("REGISTER ERROR:");
    console.error(error);

    res.status(500).json({
        success: false,
        message: error.message || "Unknown Error",
        error
    });
}
};
const loginUser = async (req, res) => {
    try {

        const result = await authService.login(req.body);

        res.status(200).json({
            success: true,
            ...result
        });

    } catch (error) {
    console.error("REGISTER ERROR:");
    console.error(error);

    res.status(500).json({
        success: false,
        message: error.message || "Unknown Error",
        error
    });
}
};
module.exports = {
    registerUser,
    loginUser
};