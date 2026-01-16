import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TrackingPage from "./pages/TrackingPage";
import DocumentUploadPage from "./pages/DocumentUploadPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/tracking" element={<TrackingPage />} />
        <Route path="/upload-document" element={<DocumentUploadPage />} />
      </Routes>
    </Router>
  );
}

export default App;
