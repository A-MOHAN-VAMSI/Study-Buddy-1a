const resultService = require("../services/resultService");
const PDFDocument = require("pdfkit");

const getMyResults = async (req, res) => {
    try {

        const studentId = req.user.id;

        const results = await resultService.getStudentResults(studentId);

        res.json({
            success: true,
            results
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getResultDetail = async (req, res) => {
    try {

        const result = await resultService.getResultDetail(req.params.id);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Result not found"
            });
        }

        res.json({
            success: true,
            result
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getExamAnalytics = async (req, res) => {
    try {

        const analytics = await resultService.getExamAnalytics(req.params.examId);

        res.json({
            success: true,
            analytics
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const downloadResultPDF = async (req, res) => {
    try {

        const result = await resultService.getResultDetail(req.params.id);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Result not found"
            });
        }

        const { student_name, exam_title, score, percentage, submitted_at } = result;
        const status = percentage >= 40 ? "PASS" : "FAIL";
        const date = new Date(submitted_at).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });

        const doc = new PDFDocument({ margin: 50 });

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="result-${req.params.id}.pdf"`
        );

        doc.pipe(res);

        // Header
        doc
            .fontSize(22)
            .font("Helvetica-Bold")
            .text("StudyBuddy — Exam Result", { align: "center" });

        doc.moveDown(0.5);
        doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
        doc.moveDown(1);

        // Details
        doc.fontSize(13).font("Helvetica");

        doc.text(`Student Name : ${student_name}`);
        doc.moveDown(0.4);
        doc.text(`Exam Title   : ${exam_title}`);
        doc.moveDown(0.4);
        doc.text(`Score        : ${score}`);
        doc.moveDown(0.4);
        doc.text(`Percentage   : ${parseFloat(percentage).toFixed(2)}%`);
        doc.moveDown(0.4);
        doc.text(`Date         : ${date}`);

        doc.moveDown(1);
        doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
        doc.moveDown(1);

        // Status badge
        doc
            .fontSize(20)
            .font("Helvetica-Bold")
            .fillColor(status === "PASS" ? "green" : "red")
            .text(`Result : ${status}`, { align: "center" });

        doc.end();

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    getMyResults,
    getResultDetail,
    getExamAnalytics,
    downloadResultPDF
};
