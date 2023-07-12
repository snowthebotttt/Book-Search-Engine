const { AuthenticationError } = require("apollo-server-express");
const { verifyToken } = require("../utils/auth");

const authMiddleware = (context) => {
  const token = context.req.headers.authorization;

  if (!token) {
    throw new AuthenticationError("Authorization header must be provided");
  }

  try {
    const user = verifyToken(token);
    context.user = user;
  } catch (err) {
    throw new AuthenticationError("Invalid token");
  }
};

module.exports = authMiddleware;
