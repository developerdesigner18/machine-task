const user = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, password: user.password },
    "machine-task-test"
  );
}

exports.register = async (req, res) => {
  console.log("register api ", req.body);
  const existUser = await user.findOne({ email: req.body.email }).lean().exec();

  if (existUser) {
    res.json({
      code: 409,
      success: false,
      message: "User with this email already exist",
    });
  } else {
    let newUser = new user();
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.password = await bcrypt.hashSync(req.body.password, 10);

    const storedUser = await newUser.save();
    if (storedUser) {
      const token = generateToken(storedUser);
      res.json({
        code: 200,
        success: true,
        data: storedUser,
        authToken: token,
      });
    } else {
      res.json({
        code: 500,
        success: false,
        message: "Something went wrong! while storing user.",
      });
    }
  }
};

exports.login = async (req, res) => {
  console.log("login api ", req.body);

  const existUser = await user.findOne({ email: req.body.email }).lean().exec();
  if (existUser) {
    bcrypt.compare(
      req.body.password,
      existUser.password,
      function (err, isMatch) {
        if (err) {
          res.json({
            code: 500,
            success: false,
            message: err.message,
          });
        } else {
          if (isMatch) {
            const token = generateToken(existUser);

            res.json({
              code: 200,
              success: true,
              data: existUser,
              authToken: token,
            });
          } else {
            res.json({
              code: 401,
              success: false,
              message: "Password is incorrect!",
            });
          }
        }
      }
    );
  } else {
    res.json({
      code: 200,
      success: false,
      message: "No user found with this email",
    });
  }
};

exports.uploadFile = async (req, res) => {
  console.log("upload file =-= ", req.body, req.file);

  const existUser = await user.findOne({ _id: req.body.id }).lean().exec();
  if (existUser) {
    let upload = existUser.uploadList ? existUser.uploadList : [];
    upload.push({
      name: req.file.originalname,
      link: "http://localhost:8000/" + req.file.filename,
      allowedUserId: req.body.allowedUserId,
      uploadedBy: req.body.id,
    });
    user.findByIdAndUpdate(
      { _id: existUser._id },
      {
        $set: {
          uploadList: upload,
        },
      },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          res.json({
            code: 500,
            success: false,
            message: err.message,
          });
        } else {
          res.json({
            code: 200,
            success: true,
            data: updatedUser,
          });
        }
      }
    );
  } else {
    res.json({
      code: 404,
      success: false,
      message: "No user found!",
    });
  }
};

exports.uploadedFileList = async (req, res) => {
  console.log("upload file list");
  let userList = [];

  const list = await user.find().lean().exec();
  if (list.length) {
    for (let user1 of list) {
      if (user1.uploadList.length) {
        for (let item of user1.uploadList) {
          let allowedUser, uploadedUser;

          uploadedUser = await user
            .findById({ _id: item.uploadedBy }, { name: 1 })
            .lean()
            .exec();
          userList.push({
            name: item.name,
            link: item.link,
            uploadedUser: uploadedUser,
            allowedUserId: item.allowedUserId,
            uploadedUserId: item.uploadedBy,
            _id: item._id,
          });
        }
      }
    }
    res.json({
      code: 200,
      success: true,
      data: userList,
    });
  } else {
    res.json({
      code: 404,
      success: false,
      message: "No user found!",
    });
  }
};

exports.singleFileDetail = async (req, res) => {
  console.log("single file upload ", req.query);

  let checkPermission;
  const fileList = await user.find().lean().exec();
  if (fileList.length) {
    for (let file of fileList) {
      if (file.uploadList.length) {
        checkPermission = file.uploadList.find((item) => {
          if (item._id == req.query.id) {
            const found = item.allowedUserId.find(
              (id) => id == req.query.userId
            );
            if (found) {
              return item;
            } else if (req.query.userId == item.uploadedBy) {
              return item;
            }
          }
        });
        if (checkPermission) {
          return res.json({
            code: 200,
            success: true,
            data: checkPermission,
          });
        } else {
          return res.json({
            code: 404,
            success: false,
            message: "No data found!",
          });
        }
      }
    }
  } else {
    res.json({
      code: 404,
      success: false,
      message: "No data found!",
    });
  }
};

exports.usersList = async (req, res) => {
  console.log("users list api ");

  const list = await user.find().lean().exec();

  if (list.length) {
    res.json({
      code: 200,
      success: true,
      data: list,
    });
  } else {
    res.json({
      code: 404,
      success: false,
      message: "No user has been registered yet!",
    });
  }
};
