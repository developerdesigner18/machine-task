const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, "..", "public");
    if (fs.existsSync(uploadDir)) {
      cb(null, uploadDir);
    } else {
      fs.mkdirSync(uploadDir, { recursive: true });
      cb(null, uploadDir);
    }
  },
  filename: async (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileUpload = multer({
  storage: storage,
});

module.exports = { fileUpload };
