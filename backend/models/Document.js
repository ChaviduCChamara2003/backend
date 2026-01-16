const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipients: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    title: { type: String, required: true },
    content: { type: String },
    fileUrl: { type: String },
    trackingNumber: { type: String, unique: true },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    currentHolder: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", documentSchema);
