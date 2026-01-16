const Document = require("../models/Document");

const updateWorkflow = async (documentId, nextRecipientId) => {
  try {
    const document = await Document.findById(documentId);
    if (!document) throw new Error("Document not found");

    // Update the current holder to the next recipient
    document.currentHolder = nextRecipientId;

    // If the next recipient is the last one, mark the document as completed
    if (
      document.recipients[document.recipients.length - 1].toString() ===
      nextRecipientId
    ) {
      document.status = "Completed";
    }

    await document.save();
    return document;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { updateWorkflow };
