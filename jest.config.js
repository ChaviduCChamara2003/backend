module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest", // For TypeScript files
    "^.+\\.jsx?$": "babel-jest", // For JavaScript files
  },
  transformIgnorePatterns: ["/node_modules/"],
  testMatch: ["<rootDir>/backend/tests/**/*.test.js"],
};
