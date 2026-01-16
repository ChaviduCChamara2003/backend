const express = require("express");
const multer = require("multer");
const path = require("path");
const Document = require("../models/Document");
const { authenticateUser } = require("../middleware/auth");
const { updateWorkflow } = require("../services/workflowEngine");
const sendNotification = require("../services/notificationService");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Upload a document
router.post(
  "/upload",
  authenticateUser,
  upload.single("file"),
  async (req, res) => {
    try {
      const { title, recipients } = req.body;
      const fileUrl = `/uploads/${req.file.filename}`;

      const document = new Document({
        sender: req.user._id,
        recipients: JSON.parse(recipients),
        title,
        fileUrl,
        currentHolder: JSON.parse(recipients)[0],
      });

      await document.save();

      // Notify all recipients
      await sendNotification(
        JSON.parse(recipients),
        `A new document titled "${title}" has been uploaded.`
      );

      res
        .status(201)
        .json({ message: "Document uploaded successfully", document });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Track a document
router.get("/track/:id", authenticateUser, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id).populate(
      "recipients currentHolder"
    );
    if (!document)
      return res.status(404).json({ message: "Document not found" });

    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update document workflow
router.post("/update-workflow/:id", authenticateUser, async (req, res) => {
  try {
    const { nextRecipientId } = req.body;
    const updatedDocument = await updateWorkflow(
      req.params.id,
      nextRecipientId
    );
    res
      .status(200)
      .json({ message: "Workflow updated successfully", updatedDocument });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
