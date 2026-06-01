const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a username"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: [
        true,
        "This email is already being used, please enter a valid email",
      ],
    },
  },
  {
    timestamps: true,
  },
);

//ge schemat ett namn "User", så vi kan nå det i userController
module.exports = mongoose.model("User", userSchema);
