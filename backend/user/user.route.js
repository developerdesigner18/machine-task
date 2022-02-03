const express = require("express");
const { protect } = require("../midleware/auth");
const { fileUpload } = require("../midleware/uploadFile");
const route = express.Router();

const controller = require("./user.controller");

route.post("/register", controller.register);
route.post("/login", controller.login);
route.put(
  "/uploadFile",
  protect,
  fileUpload.single("file"),
  controller.uploadFile
);
route.get("/uploadedFileList", protect, controller.uploadedFileList);
route.get("/singleFileDetail", protect, controller.singleFileDetail);

module.exports = route;
