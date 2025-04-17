import mongoose from "mongoose";
import validator from "validator";

interface ISeekerOtp extends Document {
  js_email: string;
  otp: string;
}

const seekerotpSchema = new mongoose.Schema<ISeekerOtp>({
  js_email: {
    type: String,
    requires: true,
    unique: true,
    validate: {
      validator: (email: string) => validator.isEmail(email),
      message: "Not a valid email",
    },
  },
  otp: {
    type: String,
    required: true,
  },
});

const seekerotp = mongoose.model<ISeekerOtp>("seekerotp", seekerotpSchema);
export default seekerotp;
