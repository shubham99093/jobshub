import { Request, Response } from "express";
import { genSalt, hash } from "bcrypt"; // for pass hashing
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import pdf from "html-pdf";
import "dotenv/config";

import {
  Tbl_js_signup,
  Tbl_rec_signup,
  Tbl_js_contact,
  Tbl_jobpost,
  Tbl_js_review,
  Tbl_rec_review,
  Tbl_rec_contact,
  Otp,
  Tbl_industry,
  Tbl_payment,
  Tbl_admin,
  Tbl_jobapply,
  googleUser as Tbl_google_user,
} from "../models";

// document
import PaymentReceiptTemplate from "../documentjs/bill";

interface AuthRequest extends Request {
  user?: any;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

const seekercon = async (req: Request, res: Response) => {
  try {
    const pay = await Tbl_js_contact.find({}).populate("seeker_id");
    res.status(200).send(pay);
    return;
  } catch (error) {
    res.status(500).send({ status: 500, error: "Internal Server Error" });
    return;
  }
};

const recruitercon = async (req: Request, res: Response) => {
  try {
    const pay = await Tbl_rec_contact.find({}).populate("rec_id");
    res.status(200).send(pay);
    return;
  } catch (error) {
    res.status(500).send({ status: 500, error: "Internal Server Error" });
    return;
  }
};

const payment = async (req: Request, res: Response) => {
  try {
    const pay = await Tbl_payment.find({}).populate("paymentby");
    res.status(200).send(pay);
  } catch (error) {
    res.status(500).send({ status: 500, error: "Internal Server Error" });
    return;
  }
};

const recruiterlist = async (req: Request, res: Response) => {
  try {
    const data = await Tbl_rec_signup.find(
      {},
      { cmp_name: 1, cmp_email: 1, rec_mno: 1, isBlock: 1 }
    ).limit(10);
    res.status(201).send(data);
  } catch (error) {
    res.status(500).send({ status: 500, error: "Internal Server Error" });
    return;
  }
};

const reclist = async (req: Request, res: Response) => {
  try {
    const data = await Tbl_rec_signup.find({});
    res.status(201).send(data);
  } catch (error) {
    res.status(500).send({ status: 500, error: "Internal Server Error" });
    return;
  }
};

const seekerlist = async (req: Request, res: Response) => {
  try {
    const data = await Tbl_js_signup.find(
      {},
      { js_name: 1, js_email: 1, js_mno: 1, isBlock: 1 }
    ).limit(10);
    res.status(201).send(data);
  } catch (error) {
    res.status(500).send({ status: 500, error: "Internal Server Error" });
    return;
  }
};

const seeklist = async (req: Request, res: Response) => {
  try {
    const data = await Tbl_js_signup.find({});
    res.status(201).send(data);
  } catch (error) {
    res.status(500).send({ status: 500, error: "Internal Server Error" });
    return;
  }
};

const totalrecruiterlist = async (req: Request, res: Response) => {
  try {
    const data = await Tbl_rec_signup.find(
      {},
      { cmp_name: 1, cmp_email: 1, rec_mno: 1, isBlock: 1 }
    );
    res.status(201).send(data);
    return;
  } catch (error) {
    res.status(500).send({ status: 500, error: "Internal Server Error" });
    return;
  }
};

const totalseekerlist = async (req: Request, res: Response) => {
  try {
    const data = await Tbl_js_signup.find(
      {},
      { js_name: 1, js_email: 1, js_mno: 1, isBlock: 1 }
    );
    res.status(201).send(data);
    return;
  } catch (error) {
    res.status(500).send({ status: 500, error: "Internal Server Error" });
    return;
  }
};

//recruiter delete
const recruiterlistdel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const del = await Tbl_rec_signup.findByIdAndDelete({ _id: id });
    res.status(201).send({ message: "Recruiter Deleted", status: 201 });
    return;
  } catch (error) {
    res.status(500).send({ status: 500, error: "Internal Server Error" });
    return;
  }
};

// seeker delete
const seekerlistdel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const del = await Tbl_js_signup.findByIdAndDelete({ _id: id });
    res.send({ message: "Seeker Deleted", status: 201 });
    return;
  } catch (error) {
    res.status(500).send({ status: 500, error: "Internal Server Error" });
    return;
  }
};

const industrydel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const del = await Tbl_industry.findByIdAndDelete({ _id: id });
    res.send({ message: "Industry Deleted", status: 201 });
    return;
  } catch (error) {
    res.status(500).send({ status: 500, error: "Internal Server Error" });
    return;
  }
};

const getseekercon = async (req: Request, res: Response) => {
  try {
    const getcontact = await Tbl_js_contact.find({}).populate("seeker_id");
    res.status(200).send(getcontact);
    return;
  } catch (error) {
    res.status(500).send({ status: 500, error: "Internal Server Error" });
    return;
  }
};

const adsignup = async (req: Request, res: Response) => {
  try {
    const { adminpwd, adminemail } = req.body;
    const admindata = new Tbl_admin({ adminemail, adminpwd });

    const salt = await genSalt(12);
    const secAdminPwd = hash(adminpwd, salt);
    const data = await Tbl_admin.create({
      adminemail: req.body.adminemail,
      adminpwd: secAdminPwd,
    });
    if (data) {
      res.send({ status: 200, data, msg: " Inserted successfully..." });
    }
  } catch (err) {
    res.json({ status: 400, err: "Something is wrong" });
  }
};

const adSignin = async (req: AuthRequest, res: Response) => {
  try {
    const { adminemail, otp } = req.body;

    if (!otp || !adminemail) {
      res
        .status(400)
        .send({ status: 400, error: "Please Enter Your OTP and Email" });
    }

    const otpverify = await Otp.findOne({ adminemail: adminemail });

    if (!otpverify) {
      res.status(400).send({ status: 400, error: "Invalid OTP" });
      return;
    }

    if (otpverify.otp === otp) {
      const user = await Tbl_admin.findOne({ adminemail: adminemail });

      if (!user) {
        res.status(400).send({ status: 400, error: "User Not Found" });
        return;
      }

      const token = jwt.sign(
        { _id: user._id },
        process.env.SECRET_KEY as string
      );
      res
        .status(201)
        .send({ status: 201, msg: "Signin Successfully", tok: token });
      return;
    } else {
      res.status(400).send({ status: 400, error: "Invalid OTP" });
      return;
    }
  } catch (error) {
    res
      .status(400)
      .send({ error: `Error from the Admin signin --->>>${error}` });
    return;
  }
};

const addindustry = async (req: AuthRequest, res: Response) => {
  try {
    const { ind_name } = req.body;
    if (!ind_name) {
      res.send({ status: 400, error: "All Fields Required" });
      return;
    }
    const match = await Tbl_industry.findOne({ ind_name });
    if (match) {
      res.send({ status: 101, error: "Industry Already Available" });
      return;
    }
    const data = await Tbl_industry.create({ ind_name: req.body.ind_name });
    if (data) res.send({ status: 200, msg: "Industry Added Successful", data });
    else res.send({ status: 400, error: "Industry Not Added" });
  } catch (error) {
    console.log(`Error in the industry manage ${error}`);
    res.status(500).send({ status: 500, error: "Internal Server Error" });
  }
};

const updateindustry = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { ind_name } = req.body;
    if (!id) res.send({ status: 400, error: "All Fields Required" });
    if (!ind_name) {
      res.send({ status: 400, error: "All Fields Required" });
      return;
    }
    const data = await Tbl_industry.findByIdAndUpdate(
      { _id: id },
      { $set: { ind_name: ind_name } },
      { new: true }
    );
    if (data)
      res.send({ status: 200, msg: "Industry Updated Successful", data });
    else res.send({ status: 400, error: "Industry Not Updated" });
  } catch (error) {
    console.log(`Error in the industry manage ${error}`);
    res.status(500).send({ status: 500, error: "Internal Server Error" });
  }
};

const recruiterdata = async (req: Request, res: Response) => {
  try {
    const alldata = await Tbl_rec_signup.find({}).limit(10); //, { cmp_name: 1, cmp_email: 1 })
    res.send(alldata);
  } catch (error) {
    console.log(`Error in admin recruiter list :- ${error}`);
    res.status(500).send({ status: 500, error: "Internal Server Error" });
  }
};

const sendotp = async (req: AuthRequest, res: Response) => {
  try {
    const { adminemail } = req.body;
    if (!adminemail) {
      res.status(400).json({ error: "Please enter your email" });
      return;
    }

    const preuser = await Tbl_admin.findOne({ adminemail });
    if (!preuser) {
      res.status(404).json({ error: "This user does not exist" });
      return;
    }

    const OTP = Math.floor(100000 + Math.random() * 900000);
    const existEmail = await Otp.findOne({ adminemail: adminemail });

    if (existEmail) {
      const updateData = await Otp.findByIdAndUpdate(
        { _id: existEmail._id },
        { otp: OTP },
        { new: true }
      );
      const mailOption = {
        from: process.env.EMAIL,
        to: adminemail,
        subject: "VerificationOTP for Signin",
        text: `OTP :- ${OTP}`,
      };

      // transporter.sendMail(mailOption, async (error, info) => {
      //   if (error) {
      //     console.log(`Error==> ${error}`);
      //     res.status(401).json({ err: "error", status: 401 });
      //     return;
      //   } else {
      //     console.log(`Email sent :- ${info}`);
      res.status(201).json({
        // info,
        status: 201,
        OTP,
      });
      //     return;
      //   }
      // });
    } else {
      const saveOtpData = await Otp.create({
        adminemail: req.body.adminemail,
        otp: OTP,
      });
      const mailOption = {
        from: process.env.EMAIL,
        to: adminemail,
        subject: "VerificationOTP for Signin",
        text: `OTP :- ${OTP}`,
      };

      // transporter.sendMail(mailOption, async (error, info) => {
      //   if (error) {
      //     console.log(`Error==> ${error}`);
      //     res.status(401).json({ err: "error", status: 401 });
      //   } else {
      // console.log(`Email sent :- ${info}`);
      res.status(201).json({
        // info,
        status: 201,
        OTP,
        // });
        // }
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", status: 500 });
  }
};

const sendOtp = async (req: Request, res: Response) => {
  try {
    const { adminemail } = req.body;

    if (!adminemail) {
      res.status(400).json({ error: "Please enter your email" });
      return;
    }

    const preuser = await Tbl_admin.findOne({ adminemail });
    if (!preuser) {
      res.status(400).json({ error: "This user does not exist" });
      return;
    }

    const OTP = Math.floor(100000 + Math.random() * 900000);
    console.log(`Generated OTP: ${OTP}`);

    await Otp.findOneAndUpdate(
      { adminemail },
      { otp: OTP, createdAt: new Date() },
      { upsert: true, new: true }
    );

    const mailOptions = {
      from: process.env.EMAIL,
      to: adminemail,
      subject: "🔐 Verification OTP for Sign-In",
      text: `Your OTP is: ${OTP}\nThis OTP is valid for 10 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email Sending Error:", error);
        res.status(500).json({ error: "Failed to send OTP", status: 500 });
        return;
      }

      console.log(`Email Sent: ${info.response}`);
      res.status(200).json({ message: "OTP sent successfully", status: 200 });
    });
  } catch (error) {
    console.error(`Error in sendOtp function: ${error}`);
    res.status(500).json({ error: "Internal Server Error", status: 500 });
  }
};

const viewindustry = async (req: AuthRequest, res: Response) => {
  try {
    const view = await Tbl_industry.find();
    res.status(201).send(view);
  } catch (error) {
    console.log(`Error from the view industry ===>${error}`);
    res.status(500).send({ status: 500, error: "Internal Server Error" });
  }
};

const seekerblock = async (req: AuthRequest, res: Response) => {
  try {
    const blockId = req.params.id;
    const block = await Tbl_js_signup.findByIdAndUpdate(
      { _id: blockId },
      {
        $set: { isBlock: 1 },
      },
      { new: true }
    );
    res.status(201).send({ status: 201, msg: "this Seeker Blocked" });
  } catch (error) {
    console.log(`Error from the seeker block ${error}`);
    res.status(500).send({ status: 500, error: "Internal Server Error" });
  }
};

const seekeractive = async (req: AuthRequest, res: Response) => {
  try {
    const blockId = req.params.id;
    const block = await Tbl_js_signup.findByIdAndUpdate(
      { _id: blockId },
      {
        $set: { isBlock: null },
      },
      { new: true }
    );
    res.status(201).send({ status: 201, msg: "this Seeker Active" });
  } catch (error) {
    console.log(`Error from the seeker block ${error}`);
    res.status(500).send({ status: 500, error: "Internal Server Error" });
  }
};

const recruiterblock = async (req: AuthRequest, res: Response) => {
  try {
    const blockId = req.params.id;
    const block = await Tbl_rec_signup.findByIdAndUpdate(
      { _id: blockId },
      {
        $set: { isBlock: 1 },
      },
      { new: true }
    );
    res.status(201).send({ status: 201, msg: "this Recruiter Blocked" });
  } catch (error) {
    console.log(`Error from the seeker block ${error}`);
    res.status(500).send({ status: 500, error: "Internal Server Error" });
  }
};

const recruiteractive = async (req: AuthRequest, res: Response) => {
  try {
    const blockId = req.params.id;
    const block = await Tbl_rec_signup.findByIdAndUpdate(
      { _id: blockId },
      {
        $set: { isBlock: null },
      },
      { new: true }
    );
    res.status(201).send({ status: 201, msg: "this Recruiter Active" });
  } catch (error) {
    console.log(`Error from the seeker block ${error}`);
    res.status(500).send({ status: 500, error: "Internal Server Error" });
  }
};

const getseekerreviewall = async (req: AuthRequest, res: Response) => {
  try {
    const data = await Tbl_js_review.find().populate("seeker_id");
    res.status(201).send(data);
  } catch (error) {
    console.log(`Error from the getseekerreviewall ${error}`);
    res.status(500).send({ status: 500, error: "Internal Server Error" });
  }
};
const getrecruiterreviewall = async (req: AuthRequest, res: Response) => {
  try {
    const data = await Tbl_rec_review.find().populate("recruiter_id");
    res.status(201).send(data);
  } catch (error) {
    console.log(`Error from the getseekerreviewall ${error}`);
    res.status(500).send({ status: 500, error: "Internal Server Error" });
  }
};

// %%%%%%%%%%%%%%% Only For Showing Perpose %%%%%%%%%%%%%%%

const jobs = async (req: AuthRequest, res: Response) => {
  try {
    const jobs = await Tbl_jobpost.find({}).populate("postedby");
    res.status(201).send(jobs);
  } catch (error) {
    console.log(`Error from the jobs:=${error}`);
    res.status(500).send({ status: 500, error: "Internal Server Error" });
  }
};

// const download = (req: Request, res: Response) => {
//   pdf
//     .create(pdfTemplate(req.body), {
//       childProcessOptions: { env: { OPENSSL_CONF: "/dev/null" } },
//     })
//     .toFile("rezultati.pdf", (err) => {
//       if (err) return console.log("error");
//       res.send(Promise.resolve());
//     });
// };

const downloadResume = (req: Request, res: Response) => {
  res.sendFile(`${__dirname}/rezultati.pdf`);
};

const backup = async (req: Request, res: Response) => {
  try {
    const { type } = req.query;

    let data;
    if (type === "recruiter") {
      const recruiters = await Tbl_rec_signup.find();
      const recruiterContect = await Tbl_rec_contact.find();
      const recruiterReview = await Tbl_rec_review.find();
      const recruiterJobPost = await Tbl_jobpost.find();
      const recruiterPayment = await Tbl_payment.find();
      const recruiterJobApply = await Tbl_jobapply.find();
      const industry = await Tbl_industry.find();

      data = {
        recruiters,
        recruiterContect,
        recruiterReview,
        recruiterJobPost,
        recruiterPayment,
        recruiterJobApply,
        industry,
      };
    } else if (type === "seeker") {
      const seekers = await Tbl_js_signup.find();
      const seekerContect = await Tbl_js_contact.find();
      const seekerReview = await Tbl_js_review.find();
      const seekerJobApply = await Tbl_jobapply.find();

      data = {
        seekers,
        seekerContect,
        seekerReview,
        seekerJobApply,
      };
    } else {
      const recruiters = await Tbl_rec_signup.find();
      const recruiterContect = await Tbl_rec_contact.find();
      const recruiterReview = await Tbl_rec_review.find();
      const recruiterJobPost = await Tbl_jobpost.find();
      const recruiterPayment = await Tbl_payment.find();
      const recruiterJobApply = await Tbl_jobapply.find();
      const industry = await Tbl_industry.find();
      const seekers = await Tbl_js_signup.find();
      const seekerContect = await Tbl_js_contact.find();
      const seekerReview = await Tbl_js_review.find();
      const seekerJobApply = await Tbl_jobapply.find();
      const googleUser = await Tbl_google_user.find();

      data = {
        recruiters,
        recruiterContect,
        recruiterReview,
        recruiterJobPost,
        recruiterPayment,
        recruiterJobApply,
        industry,
        seekers,
        seekerContect,
        seekerReview,
        seekerJobApply,
        googleUser,
      };
    }

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Disposition", `attachment; filename=${type}.json`);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
};

const createPaymentReceipt = async (req: AuthRequest, res: Response) => {
  const paymentdata = await Tbl_payment.findOne({ paymentby: req.user._id });
  const packagename = paymentdata?.packagename || "";
  const payment_id = paymentdata?.payment_id || "";
  pdf
    .create(
      PaymentReceiptTemplate({
        packagename,
        payment_id,
      }),
      {}
    )
    .toFile("rezultati.pdf", (err) => {
      if (err) {
        console.log("error");
        res.status(500).send({ status: 500, error: "Internal Server Error" });
        return;
      }
      res.send(Promise.resolve());
    });
};

const downloadPaymentReceipt = (req: Request, res: Response) => {
  res.sendFile(`${__dirname}/rezultati.pdf`);
};

export {
  downloadResume,
  recruiterlist,
  createPaymentReceipt,
  downloadPaymentReceipt,
  seekerlist,
  seekerlistdel,
  recruiterlistdel,
  getseekerreviewall,
  getrecruiterreviewall,
  seeklist,
  reclist,
  jobs,
  getseekercon,
  totalrecruiterlist,
  totalseekerlist,
  payment,
  adsignup,
  adSignin,
  addindustry,
  updateindustry,
  recruiterdata,
  sendotp,
  viewindustry,
  industrydel,
  seekerblock,
  seekeractive,
  recruiterblock,
  recruiteractive,
  seekercon,
  recruitercon,
  backup,
  // download,
};
