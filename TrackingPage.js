import React, { useState } from "react";
import TrackingAnimation from "../components/TrackingAnimation";

const TrackingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Document Created",
    "Sent to Recipient 1",
    "Sent to Recipient 2",
    "Delivered to Final Recipient",
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Document Tracking</h1>
      <TrackingAnimation steps={steps} currentStep={currentStep} />
      <div className="mt-6 flex space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
          disabled={currentStep === 0}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={() =>
            setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
          }
          disabled={currentStep === steps.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TrackingPage;
