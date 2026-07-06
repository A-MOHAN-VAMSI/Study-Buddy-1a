const authService = require("../services/authService");
const registerUser = async (req, res) => {
    try {
        const result = await authService.register(req.body);

        res.status(201).json({
            success: true,
            ...result
        });
    } catch (error) {
    console.error(error);

    res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error"
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
    console.error(error);

    res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error"
    });
}
};
module.exports = {
    registerUser,
    loginUser
};