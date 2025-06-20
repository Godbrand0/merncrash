const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const validator = require("validator");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//static signup method
userSchema.statics.signup = async function ({ email, password }) {
  //validation
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must be at least 12 characters long, and contain at least on"
    );
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw new Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

// static login method

userSchema.statics.login = async function ({ email, password }) {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (match) {
    return user;
  } else {
    throw new Error("incorrect password");
  }
};

module.exports = mongoose.model("User", userSchema);
