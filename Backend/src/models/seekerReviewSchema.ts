import mongoose from "mongoose";

const sekContactSchema = new mongoose.Schema({
  seeker_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tbl_js_signup" },
  ratingstar: { type: Number },
  review: { type: String },
});
const Tbl_js_review = mongoose.model("Tbl_js_review", sekContactSchema);
export default Tbl_js_review;
