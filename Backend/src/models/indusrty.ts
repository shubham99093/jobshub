import mongoose from "mongoose";

const industrySchema = new mongoose.Schema({
  ind_name: { type: String },
});

const Tbl_industry = mongoose.model("Tbl_industry", industrySchema);
export default Tbl_industry;
