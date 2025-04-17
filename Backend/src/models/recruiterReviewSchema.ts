import mongoose from "mongoose";

const sekContactSchema = new mongoose.Schema({
  recruiter_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tbl_rec_signup" },
  ratingstar: { type: Number },
  review: { type: String },
});
const Tbl_rec_review = mongoose.model("Tbl_rec_review", sekContactSchema);
export default Tbl_rec_review;
