import mongoose from "mongoose";
import validator from "validator";

interface IAdminOtp extends Document {
  adminemail: string;
  otp: string;
}

const adminOtpSchema = new mongoose.Schema<IAdminOtp>(
  {
    adminemail: {
      type: String,
      required: true,
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
  { collection: "adminotp", timestamps: true }
);

const adminOtp = mongoose.model("AdminOtp", adminOtpSchema);
export default adminOtp;
