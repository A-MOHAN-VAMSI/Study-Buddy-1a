const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
    getMyResults,
    getResultDetail,
    getExamAnalytics,
    downloadResultPDF
} = require("../controllers/resultController");

router.get("/my-results", verifyToken, getMyResults);
router.get("/:id/pdf", verifyToken, downloadResultPDF);
router.get("/analytics/:examId", verifyToken, adminOnly, getExamAnalytics);
router.get("/:id", verifyToken, getResultDetail);

module.exports = router;
