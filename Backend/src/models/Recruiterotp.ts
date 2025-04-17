import mongoose, { Schema, Document } from "mongoose";
import validator from "validator";

interface IRecruiterOtp extends Document {
  cmp_email: string;
  otp: string;
}

const recruiterotpSchema = new mongoose.Schema<IRecruiterOtp>(
  {
    cmp_email: {
      type: String,
      required: true, // Fixed typo
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
  },
  { collection: "recruiterotp", timestamps: true }
);

const recruiterotp = mongoose.model("recruiterotp", recruiterotpSchema);
export default recruiterotp;
