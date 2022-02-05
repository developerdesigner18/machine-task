const jwt = require("jsonwebtoken");
const user = require("../user/user.model");

exports.protect = async (req, res, next) => {
  if (req.headers && req.headers.token) {
    try {
      jwt.verify(
        req.headers.token,
        "machine-task-test",
        async (err, decoded) => {
          if (err) {
            console.log("error in verifying token ", err);
          } else {
            const foundUser = await user.findById(decoded.id);
            req.user = foundUser;

            next();
          }
        }
      );
    } catch (error) {
      next(error);
    }
  } else {
    next("Authorization token is missing!");
  }
};
