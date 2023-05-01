// check username, password in post(login) request
// if exist create new JWT
// send back to frontend

// setup authentication so only the request with JWT can access the dashboard

const jwt = require("jsonwebtoken");

const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;

  // mongoose required validation
  // Joi - package for authetication
  // check in the controller

  if (!username || !password) {
    throw new CustomAPIError("Please provide email and password", 400);
  }

  // demo id, normally provided by database
  const id = new Date().getDate();

  // try to keep payload small, better user experience
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;
  // if authorization token in not present in localStorage
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No Token Provided", 401);
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const luckyNumber = Math.floor(Math.random() * 100);

    res.status(200).json({
      msg: `Hello, ${decoded.username}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    throw new CustomAPIError("Not Authorized to access this Route", 401);
  }
};

module.exports = {
  login,
  dashboard,
};
