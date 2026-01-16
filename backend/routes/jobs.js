const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const { authenticateUser } = require("../middleware/auth");

// Create a new job
router.post("/", authenticateUser, async (req, res) => {
  try {
    const { title, description } = req.body;
    const job = new Job({
      title,
      description,
      createdBy: req.user._id,
    });

    await job.save();
    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all jobs
router.get("/", authenticateUser, async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user._id });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
