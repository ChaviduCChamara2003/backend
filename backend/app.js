const express = require("express");
const app = express();
const jobRoutes = require("./routes/jobs");
const documentRoutes = require("./routes/documents");

// ...existing middleware and route setups...

app.use("/api/jobs", jobRoutes);
app.use("/api/documents", documentRoutes);

// ...existing code...

module.exports = app;
