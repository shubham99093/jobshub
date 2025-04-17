import mongoose from "mongoose";

export interface ITblJsSignup {
  js_id: string;
  js_name: string;
  js_email: string;
  js_mno: number;
  js_gender: string;
  js_address: string;
  js_quli: string;
  js_skill?: string;
  js_dob?: Date;
  js_hobby: string;
  uni_detail: string;
  js_course_type: string;
  js_other_skill: string;
  js_course_duration: string;
  js_profile?: string;
  js_language: string;
  js_expierience: number;
  js_exp_company: string;
  googleId?: string;
  isBlock?: number;
}

const jsRegisterSchema = new mongoose.Schema({
  js_id: { type: String, require: true, trim: true },
  js_name: { type: String, require: true, trim: true },
  js_email: { type: String, require: true, trim: true },
  js_pwd: { type: String, require: true, trim: true },
  js_mno: { type: Number, require: true, trim: true },
  js_gender: { type: String, require: true, trim: true },
  js_address: { type: String, require: true, trim: true },
  js_quli: { type: String, require: true, trim: true },
  js_skill: { type: String, require: true, trim: true, default: null },
  js_dob: { type: Date },
  js_hobby: { type: String, require: true, trim: true },
  uni_detail: { type: String, require: true, trim: true },
  js_course_type: { type: String, require: true, trim: true },
  js_other_skill: { type: String, require: true, trim: true },
  js_course_duration: { type: String, require: true, trim: true },
  js_profile: { type: String },
  js_language: { type: String, require: true, trim: true },
  js_expierience: { type: Number, require: true, trim: true },
  js_exp_company: { type: String, require: true, trim: true },
  googleId: String,
  isBlock: { type: Number, default: null },
});

const Tbl_js_signup = mongoose.model("Tbl_js_signup", jsRegisterSchema);
export default Tbl_js_signup;
