// check username, password in post(login) request
// if exist create new JWT
// send back to frontend

// setup authentication so only the request with JWT can access the dashboard

const jwt = require("jsonwebtoken");

// old-> const CustomAPIError = require("../errors/custom-error");
const { BadRequestError } = require("../errors/index");

const login = async (req, res) => {
  const { username, password } = req.body;

  // mongoose required validation
  // Joi - package for authetication
  // check in the controller

  if (!username || !password) {
    // old-> throw new CustomAPIError("Please provide email and password", 400);
    throw new BadRequestError("Please provide email and password");
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
  // console.log(req.user);
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
