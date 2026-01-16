import React from "react";
import { motion } from "framer-motion";

const TrackingAnimation = ({ steps, currentStep }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-between w-full max-w-xl">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <motion.div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentStep ? "bg-green-500" : "bg-gray-300"
              }`}
              animate={{ scale: index === currentStep ? 1.2 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {index + 1}
            </motion.div>
            <span className="mt-2 text-sm text-center">{step}</span>
          </div>
        ))}
      </div>
      <motion.div
        className="h-1 bg-green-500 mt-4"
        initial={{ width: 0 }}
        animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        transition={{ duration: 0.5 }}
        style={{ maxWidth: "100%" }}
      />
    </div>
  );
};

export default TrackingAnimation;
