const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  if (req.headers && req.headers.token) {
    try {
      jwt.verify(req.headers.token, "machine-task-test", (err, decoded) => {
        if (err) {
          console.log("error in verifying token ", err);
        } else {
          next();
        }
      });
    } catch (error) {
      next(error);
    }
  } else {
    next("Authorization token is missing!");
  }
};
