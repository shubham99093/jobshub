import mongoose from "mongoose";

const recContactSchema = new mongoose.Schema({
  rec_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tbl_rec_signup" },
  cont_sub: { type: String },
  cont_msg: { type: String },
});
const Tbl_rec_contact = mongoose.model("Tbl_rec_contact", recContactSchema);
export default Tbl_rec_contact;
