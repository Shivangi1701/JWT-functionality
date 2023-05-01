class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message); // assign message to error message property of the Error class
  }
}

module.exports = CustomAPIError;
