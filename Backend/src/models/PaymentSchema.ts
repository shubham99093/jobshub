import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  paymentby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tbl_rec_signup",
  },
  packagename: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    // required: true
  },
  jobpostcount: {
    type: Number,
    default: 0,
    // required: true
  },
  payment_id: {
    type: String,
  },
  ispaid: {
    type: String,
    default: null,
  },
});

const Tbl_Payment = mongoose.model("Tbl_Payment", paymentSchema);
export default Tbl_Payment;
