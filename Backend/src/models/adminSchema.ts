import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  adminemail: { type: String },
  adminpwd: { type: String },
});

const Tbl_admin = mongoose.model("Tbl_admin", adminSchema);
export default Tbl_admin;
