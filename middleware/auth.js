const jwt = require("jsonwebtoken");
const { UnauthenticationError } = require("../errors/index");
// old - > const CustomAPIError = require("../errors/custom-error");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // if authorization token in not present in localStorage
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // old-> throw new CustomAPIError("No Token Provided", 401);
    throw new UnauthenticationError("No Token Provided");
  }

  const token = authHeader.split(" ")[1];

  // if token exist -> check whether the token is valid
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded; // destructuring payload obtained
    req.user = { id, username }; // id & username are then added to req object's user property
    next(); // next middleware - dashboard
  } catch (error) {
    //old-> throw new CustomAPIError("Not Authorized to access this Route", 401);
    throw new UnauthenticationError("Not Authorized to access this route");
  }
};

module.exports = authenticationMiddleware;
