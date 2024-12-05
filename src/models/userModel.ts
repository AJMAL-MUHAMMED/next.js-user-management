import { model, Schema, models } from "mongoose";
import jwt from "jsonwebtoken"
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Please provide username"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide email"]
  },
  password: {
    type: String
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: String,
  verifyEmailToken: String,
  verifyEmailExpiry: String,
})

userSchema.methods.generateToken = function () {
  if (!this._id || !this.username) {
    throw new Error('User ID or username is undefined');
  }
  const token = jwt.sign({
    id: this._id,
    username: this.username
  }, process.env.SECURE_PASS!, { expiresIn: '15m' });

  return token;
};

const User = models.users || model("users", userSchema);

export default User