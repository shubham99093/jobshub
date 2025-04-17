import { Request, Response } from "express";
import fs from "fs";
import bcrypt from "bcrypt"; // for pass hashing
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import axios from "axios";
import "dotenv/config";

import {
  Tbl_rec_signup,
  Tbl_jobpost,
  Tbl_rec_review,
  Tbl_rec_contact,
  Tbl_jobapply,
  Tbl_industry,
  Tbl_payment,
  recruiterotp,
} from "../models";
import { ITblJsSignup } from "../models/signupSchema";

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

const recruiterverify = (req: AuthRequest, res: Response) => {
  res.json({ verify: true });
};

const homeviewindustry = async (req: Request, res: Response) => {
  try {
    const data = await Tbl_industry.find().limit(8);
    res.status(200).send(data);
  } catch (error) {
    console.log(`Error from the view industry :--->${error}`);
  }
};

const reccontact = async (req: AuthRequest, res: Response) => {
  try {
    await Tbl_rec_contact.create({
      rec_id: req.user._id,
      cont_sub: req.body.cont_sub,
      cont_msg: req.body.cont_msg,
    });

    res.status(201).send({ status: 201, msg: "Recruiter Contact Us Complete" });
  } catch (error) {
    res.status(500).json({ status: 500, err: "Something went wrong" });
  }
};

const cmpupdatelogo = async (req: AuthRequest, res: Response) => {
  try {
    const filename = req?.file?.filename;

    if (!filename) {
      res.status(400).json({ status: 400, error: "No file uploaded" });
      return;
    }

    const id = req?.user?.id;
    const match = await Tbl_rec_signup.findById(id);
    if (!match) {
      let url = req?.file?.filename;
      const imageUrl = `./public/uploads1/seekerprofile/${url}`;
      fs.unlinkSync(imageUrl);
      res.status(401).json({ status: 401, error: "Profile pic Not uploaded" });
      return;
    }

    await Tbl_rec_signup.findByIdAndUpdate(
      { _id: req.user.id },
      { $set: { cmp_logo: filename } },
      { new: true }
    );

    res
      .status(201)
      .json({ msg: "Profile pic uploaded", status: 201, cmp_logo: filename });
  } catch (error) {
    console.log(`Error from the Image upload ===> ${error}`);
    if (req?.file?.filename) {
      let url = req?.file?.filename;
      const imageUrl = `./public/uploads1/companylogo/${url}`;
      fs.unlinkSync(imageUrl);
    }
    res.status(400).json({ error: "There is some error" });
  }
};

const cmpRegistration = async (req: AuthRequest, res: Response) => {
  try {
    const { cmp_name, cmp_pwd, rec_mno, cmp_email } = req.body;
    const cmp_logo = req.file ? req.file.filename : null;
    console.log(cmp_logo);

    // Check if required fields are provided
    if (!cmp_name || !cmp_pwd || !rec_mno || !cmp_logo || !cmp_email) {
      res.status(400).send({ msg: "All fields are required", status: 400 });
      return;
    }

    // Check if user already exists
    const userExist = await Tbl_rec_signup.findOne({ cmp_email });
    if (userExist) {
      res.status(400).send({ msg: "User Already Exist", status: 400 });
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(12);
    const secPass = await bcrypt.hash(cmp_pwd, salt);

    // Create new user
    const newUser = await Tbl_rec_signup.create({
      cmp_name,
      cmp_email,
      rec_mno,
      cmp_logo,
      cmp_pwd: secPass,
    });

    if (newUser) {
      // Send Email Notification

      const mailOptions = {
        from: process.env.EMAIL,
        to: cmp_email,
        subject: "Welcome to Job's Hub",
        html: `<p>Thank for registration , welcome to Job's Hub. </p><br>
                  Use Following credentails when prompted to log in:<br>
                  <p><strong>Username:</strong>   ${cmp_email}<br>
                  <p><strong>Password:</strong> ${cmp_pwd}</p> <br>
                  Do not Share with Anyone, <br>if you have any Question about your account or any other matter , please contact on email: jobshub0514@gmail.com <br><br>
                  Thank you again,<br>
                <b>Job's Hub</b>
                  `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Email error:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });

      // Send WhatsApp Notification
      const data = {
        message: `Welcome to Job's Hub!\nUsername: ${cmp_email}`,
        media: "[]",
        delay: "0",
        schedule: "",
        numbers: `${rec_mno}`,
      };

      try {
        await axios.post("http://api.wapmonkey.com/send-message", data, {
          headers: {
            Authorization:
              "U2FsdGVkX18WTbtYybrUkRgo7/Xs82Hho79OfVRaj6ft4oYJYUEKkMi04eH0YNOW",
          },
        });
      } catch (error) {
        console.error("WhatsApp Error:", error);
      }

      res.status(200).send({
        status: 200,
        msg: "User registered successfully",
        newUser,
      });
    }
  } catch (error) {
    console.log("Error from recruiter signup", error);
    res.status(500).send({ status: 500, msg: "Internal Server Error" });
  }
};

const cmpLogin = async (req: AuthRequest, res: Response) => {
  try {
    const { cmp_email, cmp_pwd } = req.body;

    // Find user by email
    let users = await Tbl_rec_signup.findOne({ cmp_email });

    if (!users) {
      res
        .status(400)
        .send({ status: 8, err: "Please Create Your Account First" });
      return;
    }

    // Check if user is blocked
    if (users.isBlock == 1) {
      res.send({ status: 11, err: "You are Blocked From Job's Hub" });
      return;
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(cmp_pwd, users.cmp_pwd);
    if (!passwordMatch) {
      res.send({ status: 400, error: "email or password are invalid" });
      return;
    }

    // Generate JWT token
    console.log(process.env.SECRET_KEY);
    const token = jwt.sign({ cmpid: users._id }, process.env.SECRET_KEY || "");

    // Check payment status
    const match = await Tbl_payment.findOne({ paymentby: users._id });

    let existStatus;
    if (users.employess === null) {
      existStatus = 1;
    } else if (!match || match.ispaid === null) {
      existStatus = 3;
    } else {
      existStatus = 2;
    }

    res.send({
      status: 200,
      exist: existStatus,
      message: "Login Success...!",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: 500, error: "Internal Server Error" });
  }
};

const recdeleteaccount = async (req: AuthRequest, res: Response) => {
  try {
    // Find recruiter by ID
    const match = await Tbl_rec_signup.findById(req.user._id);

    if (!match) {
      res.status(400).send({ status: 400, msg: "User Not Exist" });
      return;
    }

    // Delete recruiter account
    await Tbl_rec_signup.findByIdAndDelete(req.user._id);

    // Delete all related data
    await Tbl_jobpost.deleteMany({ postedby: req.user._id });
    await Tbl_rec_contact.deleteMany({ rec_id: req.user._id });
    await Tbl_rec_review.deleteMany({ recruiter_id: req.user._id });

    res.status(200).send({ msg: "Recruiter Account Deleted", status: 200 });
  } catch (error) {
    console.error(`Error from the recruiter delete account ==> ${error}`);
    res.status(500).send({ status: 500, error: "Internal Server Error" });
  }
};

const cmpCreate = async (req: AuthRequest, res: Response) => {
  try {
    // Update company details
    const companyToupdate = await Tbl_rec_signup.findByIdAndUpdate(
      req.user._id,
      { $set: req.body },
      { new: true }
    );

    if (!companyToupdate) {
      res.status(404).send({ status: 404, message: "Company not found" });
      return;
    }

    res
      .status(200)
      .send({ message: "Company updated successfully", status: 200 });
  } catch (error) {
    console.error("Error updating company:", error);
    res.status(500).send({ status: 500, error: "Internal Server Error" });
  }
};

const getrecruiter = async (req: AuthRequest, res: Response) => {
  try {
    res.send(req.user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: 500, error: "Internal Server Error" });
  }
};

const checkpayment = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.user._id;
    const pay = await Tbl_payment.findOne({ paymentby: id });
    const profile = await Tbl_rec_signup.findById({ _id: id });

    if (!profile) {
      res.status(401).send({ status: 0, message: "Profile not found" });
      return;
    }

    if (profile.employess == null) {
      res.status(201).send({ status: 1 });
    } else if (pay == null) {
      res.status(201).send({ status: 2 });
    } else {
      res.status(401).send({ status: 0 });
    }
  } catch (error) {
    console.log("error from  the check payment ", error);
    res.status(500).send({ status: 500, error: "Internal Server Error" });
  }
};

const recmail = async (req: Request, res: Response) => {
  try {
    const { cmp_email } = req.body;
    if (!cmp_email) {
      res.status(400).json({ error: "Email is required", status: 400 });
      return;
    }

    const userMatch = await Tbl_rec_signup.findOne({ cmp_email });

    if (!userMatch) {
      console.log("User not found");
      res.status(404).json({ error: "User not found", status: 404 });
      return;
    }

    const OTP = Math.floor(100000 + Math.random() * 900000);

    let emailMatch = await recruiterotp.findOne({ cmp_email });

    if (emailMatch) {
      emailMatch.otp = OTP.toString();
      await emailMatch.save();
    } else {
      emailMatch = await recruiterotp.create({ cmp_email, otp: OTP });
    }

    const mailOptions = {
      from: process.env.EMAIL,
      to: cmp_email,
      subject: "OTP for Password Reset",
      text: `Your OTP is: ${OTP}`,
    };

    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.error("Email error:", error);
    //     res.status(500).json({ error: "Failed to send OTP", status: 500 });
    //     return;
    //   } else {
    // console.log(`Email sent: ${info.response}`);
    res
      .status(200)
      .json({ message: "OTP sent successfully", status: 200, otp: OTP });
    return;
    //   }
    // });
  } catch (error) {
    console.error(`Error in mail auth: ${error}`);
    res.status(500).json({ error: "Internal Server Error", status: 500 });
  }
};

var recruiterverifyotp = async (req: Request, res: Response) => {
  try {
    const { otp, cmp_email } = req.body;
    if (!cmp_email || !otp) {
      res
        .status(400)
        .json({ status: 400, error: "Email and OTP are required" });
      return;
    }

    const match = await recruiterotp.findOne({ cmp_email });

    if (!match) {
      res
        .status(404)
        .json({ status: 404, error: "OTP not found for this email" });
      return;
    }

    if (otp === match.otp)
      res.status(201).send({ status: 201, msg: "OTP is Verify" });
    else res.status(400).send({ msg: "Invalid OTP ", status: 400 });
  } catch (error) {
    console.error("Error in OTP verification:", error);
    res.status(400).json({ status: 400, error: "Internal Server Error" });
  }
};

const recruiterforgot = async (req: Request, res: Response) => {
  try {
    const { cmp_email, newpwd, conpwd } = req.body;

    if (!cmp_email || !newpwd || !conpwd) {
      res.status(400).json({ status: 400, error: "All fields are required" });
      return;
    }

    if (newpwd !== conpwd) {
      res.status(400).json({ status: 400, error: "Passwords do not match" });
      return;
    }

    const validOtp = await recruiterotp.findOne({ cmp_email });

    if (!validOtp) {
      res
        .status(401)
        .json({ status: 401, error: "Invalid OTP or session expired" });
      return;
    }

    const recruiter = await Tbl_rec_signup.findOne({ cmp_email });

    if (!recruiter) {
      res.status(404).json({ status: 404, error: "Recruiter not found" });
      return;
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(newpwd, salt);

    recruiter.cmp_pwd = hashedPassword;
    await recruiter.save();

    res
      .status(200)
      .json({ status: 200, message: "Password changed successfully" });
  } catch (error) {
    console.error("Error in recruiterForgot:", error);
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};

const recchangepassword = async (req: AuthRequest, res: Response) => {
  try {
    const { oldpwd, updatedpass, updateconpass } = req.body;

    if (!oldpwd || !updatedpass || !updateconpass) {
      res.status(400).json({ status: 400, error: "All fields are required" });
      return;
    }

    if (updatedpass !== updateconpass) {
      res.status(400).json({
        status: 400,
        error: "New password & confirm password must be the same",
      });
      return;
    }

    const recruiter = await Tbl_rec_signup.findById(req.user.id);

    if (!recruiter) {
      res.status(404).json({ status: 404, error: "Recruiter not found" });
      return;
    }

    const isOldPasswordCorrect = await bcrypt.compare(
      oldpwd,
      recruiter.cmp_pwd
    );

    if (!isOldPasswordCorrect) {
      res.status(401).json({ status: 401, error: "Old password is incorrect" });
      return;
    }

    const isSameAsOldPassword = await bcrypt.compare(
      updatedpass,
      recruiter.cmp_pwd
    );

    if (isSameAsOldPassword) {
      res.status(400).json({
        status: 400,
        error: "New password must be different from the old password",
      });
      return;
    }

    const salt = await bcrypt.genSalt(12);
    recruiter.cmp_pwd = await bcrypt.hash(updatedpass, salt);
    await recruiter.save();

    res
      .status(200)
      .json({ status: 200, message: "Password changed successfully" });
  } catch (error) {
    console.error(`Error in recChangePassword: ${error}`);
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};

const manageindustry = async (req: Request, res: Response): Promise<void> => {
  try {
    const industries = await Tbl_industry.find({});

    res.status(201).json({
      status: 201,
      message: "Industries retrieved successfully",
      data: industries,
    });
  } catch (error) {
    console.error(`Error in manageIndustry: ${error}`);
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};

const getappliedUser = async (req: AuthRequest, res: Response) => {
  try {
    const applications = await Tbl_jobapply.find({
      rec_id: req.user._id,
      show: true,
    }).populate("js_id");

    const result = applications.filter((item) => item.accept === 0);
    res.status(200).send(result);
  } catch (error) {
    console.error(`Error in getAppliedUser: ${error}`);
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};

const AcceptUserList = async (req: AuthRequest, res: Response) => {
  try {
    const response = await Tbl_jobapply.find({ rec_id: req.user._id }).populate(
      "js_id"
    );
    const result = response.filter((item) => item.accept == 1);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};

const RejectUserList = async (req: AuthRequest, res: Response) => {
  try {
    const response = await Tbl_jobapply.find({ rec_id: req.user._id }).populate(
      "js_id"
    );
    const result = response.filter((item) => item.accept == 2);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};

const acceptRequest = async (req: Request, res: Response) => {
  const jobid = req.params.id;
  try {
    const result = await Tbl_jobapply.findByIdAndUpdate(
      { _id: jobid },
      { accept: 1 }
    );
    if (!result) {
      res.send("something wrong");
      return;
    }
    await result.save();
    res.send({ message: "accept requestr successfully", status: 200 });
  } catch (error) {
    res.send("sometiong wrong");
  }
};

const acceptmail = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const seekerData = await Tbl_jobapply.findById(id).populate<{
      js_id: ITblJsSignup;
    }>("js_id");

    if (!seekerData || !seekerData.js_id || !seekerData?.js_id?.js_email) {
      res
        .status(404)
        .json({ status: 404, error: "Job seeker email not found" });
      return;
    }

    const seekerEmail = seekerData.js_id.js_email;
    const mailOptions = {
      from: process.env.EMAIL,
      to: seekerEmail,
      subject: "🥳 Your Job Application Has Been Accepted! 🥳",
      text: `We are happy to inform you that you have been selected for the Developer position. Please contact our HR department immediately for the interview process.`,
    };

    // transporter.sendMail(mailOptions, async (error, info) => {
    //   if (error) {
    //     console.error(`Error sending email: ${error}`);
    //     res.status(401).json({ status: 401, error: "Email sending failed" });
    //   } else {
    //     console.log(`Email sent successfully: ${info.response}`);
    res.status(201).json({
      status: 201,
      message: "Email sent successfully",
      // info
    });
    //   }
    // });
  } catch (error) {
    console.log(`Error from the accept mail send :==> ${error}`);
  }
};

const rejectRequest = async (req: AuthRequest, res: Response) => {
  try {
    const jobid = req.params.id;

    // Update the job application status
    const result = await Tbl_jobapply.findByIdAndUpdate(
      jobid,
      { accept: 2 },
      { new: true }
    );

    if (!result) {
      res
        .status(404)
        .json({ status: 404, message: "Job application not found" });
      return;
    }

    res
      .status(200)
      .json({ status: 200, message: "Request rejected successfully", result });
  } catch (error) {
    console.error("Error in rejectRequest:", error);
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};

const recruiterreview = async (req: AuthRequest, res: Response) => {
  try {
    const rec_id = req.user._id;
    const { ratingstar, review } = req.body;
    if (!ratingstar || !review) {
      res
        .status(400)
        .json({ status: 400, message: "Rating and review are required" });
      return;
    }

    const data = await Tbl_rec_review.findOneAndUpdate(
      { recruiter_id: rec_id },
      { $set: { ratingstar, review } },
      { new: true, upsert: true }
    );

    res
      .status(201)
      .json({ status: 201, data, message: "Review saved successfully" });
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};

const getrecruiterreview = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.user?._id;
    if (!id) {
      res.status(400).json({ status: 400, error: "User ID is required" });
      return;
    }

    const data = await Tbl_rec_review.findOne({ recruiter_id: id });

    if (data) {
      res.status(201).json({ status: 1, data });
    } else {
      res.status(201).json({ status: 2, data });
    }
  } catch (error) {
    console.error(`Error in getRecruiterReview: ${error}`);
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};

export {
  reccontact,
  recruiterverify,
  cmpRegistration,
  cmpupdatelogo,
  cmpLogin,
  cmpCreate,
  getrecruiter,
  rejectRequest,
  checkpayment,
  recruiterverifyotp,
  recmail,
  recruiterforgot,
  recchangepassword,
  manageindustry,
  recdeleteaccount,
  acceptRequest,
  RejectUserList,
  AcceptUserList,
  getappliedUser,
  acceptmail,
  recruiterreview,
  getrecruiterreview,
  homeviewindustry,
};
