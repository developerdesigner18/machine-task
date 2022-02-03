const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const userRoute = require("./user/user.route");

const app = express();

mongoose.connect(
  "mongodb+srv://dds:dds123@cluster0-qxjv3.mongodb.net/machine-task?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error, result) => {
    if (error) {
      console.log("error while connecting to db", error);
    } else {
      console.log("successfully connected with db");
    }
  }
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PUT, POST, PATCH, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    return res.status(200).json({});
  }
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api", userRoute);

app.listen(8000, () => console.log("server is listening on port 8000"));
