const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  uploadList: [
    {
      name: String,
      link: String,
      permission: Boolean,
    },
  ],
});

const user = mongoose.model("user", userSchema, "user");
module.exports = user;
