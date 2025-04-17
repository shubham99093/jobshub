import mongoose from "mongoose";

const jobapplySchema = new mongoose.Schema(
  {
    rec_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tbl_rec_signup",
    },
    js_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tbl_js_signup",
    },
    resume: {
      type: String,
    },
    show: { type: Boolean, default: true },
    accept: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Tbl_jobapply = mongoose.model("Tbl_jobapply", jobapplySchema);
export default Tbl_jobapply;
