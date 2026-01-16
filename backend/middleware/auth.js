const authenticateUser = (req, res, next) => {
  // Mock authentication middleware for testing
  req.user = { _id: "test-user-id" };
  next();
};

module.exports = { authenticateUser };
