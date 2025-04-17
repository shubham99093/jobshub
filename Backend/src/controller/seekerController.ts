import { Request, Response } from "express";
import fs from "fs";
import bcrypt from "bcrypt"; // for pass hashing
import jwt from "jsonwebtoken";
import crypto, { verify } from "crypto";
import nodemailer from "nodemailer";
import "dotenv/config";

import {
  Tbl_js_signup,
  Tbl_js_contact,
  Tbl_jobpost,
  Tbl_js_review,
  Tbl_jobapply,
  seekerotp,
  Counter,
} from "../models";

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

const seekerverify = (req: AuthRequest, res: Response) => {
  res.json({ verify: true });
};

const seekerbackup = async (req: AuthRequest, res: Response) => {
  // const jsid = req.user.id
  try {
    const record = await Tbl_js_signup.aggregate([
      {
        $lookup: {
          from: "tbl_jobapplies",
          localField: "_id",
          foreignField: "js_id",
          as: "seeker_apply_data",
        },
      },
      {
        $lookup: {
          from: "Tbl_js_review",
          localField: "_id",
          foreignField: "seeker_id",
          as: "seeker_review_data",
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);

    res.send({ record });
  } catch (error) {
    console.log(`Error from the seeker back up ====>${error}`);
  }
};

const seekercontact = async (req: AuthRequest, res: Response) => {
  try {
    const { cont_sub, cont_msg } = req.body;
    const data = await Tbl_js_contact.create({
      seeker_id: req.user.id,
      cont_sub: req.body.cont_sub,
      cont_msg: req.body.cont_msg,
    });
    res.status(201).send({ status: 201, msg: "send it contact" });
  } catch (error) {
    console.log(`Error from the seeker contact ${error}`);
  }
};

const signup = async (req: AuthRequest, res: Response) => {
  try {
    const { js_name, js_email, js_mno, js_cpwd, js_pwd } = req.body;

    if (!js_name || !js_email || !js_mno || !js_cpwd || !js_pwd) {
      res.status(400).json({ status: 400, err: "All fields are required" });
      return;
    }

    // Check if email already exists
    const emailMatch = await Tbl_js_signup.findOne({ js_email });
    if (emailMatch) {
      res
        .status(409)
        .json({ status: 3, err: "Email Already Exists! Please Login" });
      return;
    }

    // Check if passwords match
    if (js_pwd !== js_cpwd) {
      res.status(400).json({
        status: 400,
        err: "Password & Confirm Password must be the same",
      });
      return;
    }

    let counter = await Counter.findOneAndUpdate(
      { id: "autoval" },
      { $inc: { seq: 1 } },
      { returnDocument: "after", upsert: true }
    );

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(js_pwd, salt);

    // Generate unique user ID
    const js_id = crypto.randomUUID();

    // Save user to DB
    const user = await Tbl_js_signup.create({
      js_id,
      js_name,
      js_email,
      js_mno,
      js_pwd: hashedPassword, // Store only the hashed password
    });

    // Send welcome email
    const mailOptions = {
      from: process.env.EMAIL,
      to: js_email,
      subject: "Thank You For Signing Up at Job's Hub",
      html: `
        <p>Here is your <strong>username</strong> and <strong>password</strong>:</p>
        <p><strong>Username:</strong> ${js_email}</p>
        <p><strong>Password:</strong> ${js_pwd}</p>
      `,
    };
    // try {
    //   await transporter.sendMail(mailOptions);
    //   console.log(`Email sent to: ${js_email}`);
    // } catch (emailError) {
    //   console.error("Error sending email:", emailError);
    // }

    // Send final response
    res.status(201).json({
      status: 200,
      message: "User registered successfully",
      user,
    });
    return;
  } catch (error) {
    console.error("Error in Signup:", error);
    res.status(500).json({ status: 500, err: "Something went wrong" });
    return;
  }
};

const signin = async (req: Request, res: Response) => {
  try {
    const { js_email, js_pwd } = req.body;

    if (!js_email || !js_pwd) {
      res.status(400).json({ status: 400, err: "All fields are required" });
      return;
    }

    // Find user by email
    const user = await Tbl_js_signup.findOne({ js_email });

    if (!user) {
      res.status(404).json({
        status: 8,
        err: "User does not exist. Please sign up first.",
      });
      return;
    }

    // Check if user is blocked
    if (user.isBlock === 1) {
      res
        .status(403)
        .json({ status: 11, err: "You are blocked from Job's Hub" });
      return;
    }

    // Check password
    const passMatch = await bcrypt.compare(js_pwd, user.js_pwd || "");
    if (!passMatch) {
      res.status(401).json({ status: 401, err: "Invalid credentials" });
      return;
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY || "", {
      expiresIn: "7d",
    });

    // Send success response
    res.status(200).json({
      status: user.js_skill ? 2 : 1,
      msg: "Logged in successfully",
      token,
      id: user._id,
    });
    return;
  } catch (error) {
    console.error("Error during sign-in:", error);
    res
      .status(500)
      .json({ status: 500, err: "Login failed. Please try again." });
    return;
  }
};

const sekdeleteaccount = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.user.id;
    const match = await Tbl_js_signup.findById(id);
    if (!match) {
      res.status(400).send("User Not Exist ");
      return;
    }

    const recdel = await Tbl_js_signup.findByIdAndDelete({ _id: id });
    const appdel = await Tbl_jobapply.findOneAndDelete({ js_id: id });
    const revdel = await Tbl_js_review.findOneAndDelete({ seeker_id: id });
    const condel = await Tbl_js_contact.findOneAndDelete({ seeker_id: id });
    const otpdel = await seekerotp.findOneAndDelete({
      js_email: match.js_email,
    });

    res.status(201).send({ msg: "Recruiter Account Deleted", status: 201 });
  } catch (error) {
    console.log(`Error from the Seeker delete Account==>${error}`);
    res.status(500).json({ status: 500, err: "Something went wrong" });
  }
};

const getseeker = async (req: AuthRequest, res: Response) => {
  res.send(req.user);
};

const checkprofile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await Tbl_js_signup.findById(req.user.id);

    if (!user) {
      res.status(404).json({ status: 404, err: "User not found" });
      return;
    }
    if (
      user.js_name !== "" &&
      user.js_address !== "" &&
      user.js_skill !== "" &&
      user.js_quli !== "" &&
      user.js_gender !== "" &&
      user.js_email !== "" &&
      user.js_dob !== null &&
      user.js_pwd !== "" &&
      user.js_language !== "" &&
      user.uni_detail !== "" &&
      user.js_course_type !== "" &&
      user.js_course_duration !== "" &&
      user.js_expierience !== null &&
      user.js_exp_company !== "" &&
      user.js_hobby !== "" &&
      user.js_other_skill !== ""
    ) {
      res.status(201).send({ status: 201, msg: "Profile Completed" });
    } else {
      res.status(201).send({ status: 0, msg: "Profile Not Completed" });
    }
  } catch (err) {
    res.status(500).json({ status: 0, err: "Something went wrong" });
  }
};

const updateprofile = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.user.id;
    const usermatch = await Tbl_js_signup.findById(id);

    if (!usermatch) {
      res.status(401).send({ status: 401, error: "User Invalid " });
      return;
    }

    const updateUser = await Tbl_js_signup.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!updateUser) {
      res.status(404).json({ status: 404, error: "User not found" });
      return;
    }

    res.status(201).send({
      status: 201,
      data: updateUser,
      msg: "Profile updated successfully",
    });
  } catch (error) {
    console.error(`Error in Update Profile: ${error}`);
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};

const updateimage = async (req: AuthRequest, res: Response) => {
  try {
    const filename = req?.file?.filename;

    if (!filename) {
      res.status(400).json({ status: 400, error: "No file uploaded" });
      return;
    }

    const id = req?.user?.id;
    const match = await Tbl_js_signup.findById(id);

    if (!match) {
      let url = req?.file?.filename;
      const imageUrl = `./public/uploads1/seekerprofile/${url}`;
      fs.unlinkSync(imageUrl);
      res.status(401).json({ status: 401, error: "Profile pic Not uploaded" });
      return;
    }

    await Tbl_js_signup.findByIdAndUpdate(
      { _id: req.user.id },
      { $set: { js_profile: filename } },
      { new: true }
    );

    res
      .status(201)
      .json({ msg: "Profile pic uploaded", status: 201, js_profile: filename });
  } catch (error) {
    console.log(`Error from the Image upload ===> ${error}`);
    if (req?.file?.filename) {
      let url = req?.file?.filename;
      const imageUrl = `./public/uploads1/seekerprofile/${url}`;
      fs.unlinkSync(imageUrl);
    }
    res.status(400).json({ error: "There is some error" });
  }
};

// Contact create api
const js_contact = async (req: AuthRequest, res: Response) => {
  try {
    const { seeker_id, js_sub, js_msg } = req.body;
    const { id } = req.user;
    const seeker_contact = await Tbl_js_contact.create({
      seeker_id: seeker_id,
      //seeker_id i think it doesn't came from the req.body
      //if not than use req.user.id
      // seeker_id: id,
      cont_sub: js_sub,
      cont_msg: js_msg,
    });
    console.log(seeker_contact);
    res.send({ status: 200, msg: "Successful contact" });
  } catch (error) {
    console.log(error);
  }
};

const seekerreview = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.user.id;
    const { ratingstar, review } = req.body;

    if (!ratingstar || !review) {
      res.status(400).json({ status: 400, error: "All fields required" });
      return;
    }

    const exist = await Tbl_js_review.findOne({ seeker_id: id });

    if (!exist) {
      const data = await Tbl_js_review.create({
        seeker_id: id,
        ratingstar: req.body.ratingstar,
        review: req.body.review,
      });
      res.status(201).send({ status: 201, data: data, msg: "review send" });
      return;
    }

    const data = await Tbl_js_review.findOneAndUpdate(
      { seeker_id: id },
      {
        $set: {
          ratingstar: req.body.ratingstar,
          review: req.body.review,
        },
      },
      { new: true }
    );

    res.status(201).send({ status: 201, data: data, msg: "review send" });
  } catch (error) {
    console.error(`Error from sending review: ${error}`);
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};

const getseekerreview = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.user.id;
    const data = await Tbl_js_review.findOne({ seeker_id: id }).populate(
      "seeker_id"
    );
    res.status(201).send(data);
  } catch (error) {}
};

const sendmsg = async (req: AuthRequest, res: Response) => {
  const { message, numers } = req.body;
  const option = {
    authorization:
      "GKtqkaIObmUrSxLu0ReQNf3gcFjdAYnoi2965TVZJCPzyHBlW1s4cflBz6hnyH1vjgLU9km3IXFGaW2p",
    message: message,
    numbers: [numers],
  };
  try {
    // const responce = await fast2sms.sendMessage(option);
    // console.log(responce);
  } catch (error) {
    console.log(`Error from the sending sms====>${error}`);
  }
};

const get_contact = async (req: AuthRequest, res: Response) => {
  const conData = await Tbl_js_contact.findOne({
    _id: req.body.seeker_id,
  }).populate("seeker_id");
  res.send({ msg: conData });
};

interface Query {
  search?: string;
  gender?: string;
  salaryrange?: string;
  jobtype?: string;
  qualification?: string;
  sort?: string;
  isDeleted?: boolean;
  jobtitle?: {
    $regex?: string;
  };
}

const getjobpost = async (req: AuthRequest, res: Response) => {
  const search = (req.query.search as string) || "";
  const gender = (req.query.gender as string) || "";
  const salaryrange = (req.query.salaryrange as string) || "";
  const jobtype = (req.query.jobtype as string) || "";
  const qualification = (req.query.qualification as string) || "";
  const query: Query = {
    isDeleted: true,
    jobtitle: {
      $regex: search.toLowerCase(),
    },
  };
  gender ? (query.gender = gender) : null;
  salaryrange ? (query.salaryrange = salaryrange) : null;
  jobtype ? (query.jobtype = jobtype) : null;
  qualification ? (query.qualification = qualification) : null;

  try {
    const job = await Tbl_jobpost.find(query).populate("postedby");
    res.status(200).send(job);
  } catch (error) {
    console.log(`Error in Gegt Job Post :- ${error}`);
  }
};

const getjobedu = async (req: AuthRequest, res: Response) => {
  try {
    const js_qulis = req.user.js_quli;
    const job = await Tbl_jobpost.find({
      // degree: { $in: [js_qulis] },
      degree: { $regex: new RegExp(`\\b${js_qulis}\\b`, "i") },
    }).populate("postedby");

    res.status(200).send(job);
  } catch (error) {
    console.log(`Error in Gegt Job Post :- ${error}`);
    res.status(500).json({ status: 500, err: "Something went wrong" });
  }
};

const applyjob = async (req: AuthRequest, res: Response) => {
  try {
    const rec_id = req.params.id;
    const js_id = req.user.id;
    const resume = req?.file?.filename;

    if (!rec_id) {
      res.status(400).json({ status: 400, err: "Recruiter id not found" });
      return;
    }
    if (!js_id) {
      res.status(400).json({ status: 400, err: "Seeker id not found" });
      return;
    }
    if (!resume) {
      res.status(400).json({ status: 400, err: "Resume not uploaded" });
      return;
    }

    const data = await Tbl_jobapply.create({
      js_id: js_id,
      rec_id: rec_id,
      resume: resume,
      accept: 0,
    });
    res.status(201).send({ data, status: 201 });
  } catch (error) {
    console.log(`error ${error}`);
    res.status(500).json({ status: 500, err: "Something went wrong" });
  }
};

const mail = async (req: AuthRequest, res: Response) => {
  const { js_email } = req.body;
  try {
    const emailMatch = await Tbl_js_signup.findOne({ js_email: js_email });
    if (!emailMatch) {
      res
        .status(401)
        .json({ err: "Email Id Not Exist In Job's Hub", status: 401 });
      return;
    }

    const OTP = Math.floor(100000 + Math.random() * 900000);
    const otpemail = await seekerotp.findOne({ js_email: js_email });

    const mailOptions = {
      from: process.env.EMAIL,
      to: js_email,
      subject: "OTP For Forgot Password",
      text: `Your OTP is  :- ${OTP}`,
    };
    if (otpemail) {
      await seekerotp.findOneAndUpdate(
        { js_email },
        { $set: { otp: OTP } },
        { new: true }
      );
    } else {
      await seekerotp.create({
        js_email: req.body.js_email,
        otp: OTP,
      });
    }
    // transporter.sendMail(mailOptions, async (error, info) => {
    //   if (error) {
    //     console.log("Error", error);
    //     res
    //       .status(401)
    //       .json({ err: "Email Id Not Exist In Job's Hub", status: 401 });
    //   } else {
    // console.log(`Email sent :- ${JSON.stringify(info)}`);
    res.status(201).json({ status: 201, otp: OTP });
    //   }
    // });
  } catch (error) {
    console.log(`Error in mail auth :- ${error}`);
    res.status(500).json({ status: 500, err: "Something went wrong" });
  }
};

const seekerotpverify = async (req: AuthRequest, res: Response) => {
  try {
    const { otp, js_email } = req.body;
    const match = await seekerotp.findOne({ js_email });

    if (!match) {
      res.status(404).send({ msg: "Email not found", status: 404 });
      return;
    }

    if (otp.toString() === match.otp.toString()) {
      res.status(201).send({ status: 201, msg: "OTP is Verify" });
    } else {
      res.status(400).send({ msg: "Invalid OTP ", status: 400 });
    }
  } catch (error) {
    console.log("into catch");
    res.status(400).send({ status: 400, error });
  }
};

const seekerforgot = async (req: AuthRequest, res: Response) => {
  const { js_email, newpwd } = req.body;
  try {
    const valid = await seekerotp.findOne({ js_email: js_email });

    if (!valid) {
      res.status(401).send({ msg: "Please Try Again", status: 401 });
      return;
    }

    const match = await Tbl_js_signup.findOne({ js_email: js_email });
    const salt = await bcrypt.genSalt(12);
    const secPass = bcrypt.hashSync(newpwd, salt);

    await Tbl_js_signup.findOneAndUpdate(
      { js_email: js_email },
      { $set: { js_pwd: secPass } },
      { new: true }
    );
    res.status(201).send({ msg: "Password Changed", status: 201 });
  } catch (error) {
    console.log("catch from the seekerforgot", error);
    res.status(401).send({ status: 401, error });
  }
};

//  Get Seeker Applied Job Data

const jobhistory = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.user.id;

    const data = await Tbl_jobapply.find(
      { js_id: id, show: true },
      { show: 0 }
    ).populate("rec_id");

    res.status(201).send(data);
  } catch (error) {
    console.log(`Error from the jobhistory catch :- ${error}`);
    res.status(500).json({ status: 500, err: "Something went wrong" });
  }
};

const jobhistoryaccept = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.user.id;

    const data = await Tbl_jobapply.find(
      { js_id: id, show: true, accept: 1 },
      { show: 0 }
    ).populate("rec_id");

    res.status(201).send(data);
  } catch (error) {
    console.log(`Error from the jobhistory catch :- ${error}`);
    res.status(500).json({ status: 500, err: "Something went wrong" });
  }
};

const jobhistoryreject = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.user.id;

    const data = await Tbl_jobapply.find(
      { js_id: id, show: true, accept: 2 },
      { show: 0 }
    ).populate("rec_id");

    res.status(201).send(data);
  } catch (error) {
    console.log(`Error from the jobhistory catch :- ${error}`);
    res.status(500).json({ status: 500, err: "Something went wrong" });
  }
};

//  Seeker Job Apply Backup
const jobbackup = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const match = await Tbl_jobapply.findById({ _id: id }).populate("js_id");

    if (!match) {
      res.status(401).send({ status: 401, err: "Not Backup" });
      return;
    }

    const newapply = await Tbl_jobapply.findByIdAndUpdate(
      { _id: id },
      { $set: { show: false } },
      { new: true }
    );
    res.status(201).send({ status: 201, newapply });
  } catch (error) {
    console.log(`Error from the job backup :- ${error}`);
    res.status(500).json({ status: 500, err: "Something went wrong" });
  }
};

const jobapplyrestore = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const match = await Tbl_jobapply.findById({ _id: id }).populate("js_id");

    if (!match) {
      res.status(401).send({ status: 401, err: "Not Backup" });
      return;
    }

    const newapply = await Tbl_jobapply.findByIdAndUpdate(
      { _id: id },
      { show: true },
      { new: true }
    );
    await newapply?.save();
    res.status(201).send({ status: 201, newapply });
  } catch (error) {
    console.log(`Error from the job backup :- ${error}`);
    res.status(500).json({ status: 500, err: "Something went wrong" });
  }
};

// Seeker job restore
const restorejob = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.user.id;
    const data = await Tbl_jobapply.find(
      { js_id: id, show: { $ne: null } },
      { show: 0 }
    )
      .populate("rec_id")
      .populate("js_id");
    res.status(201).send(data);
  } catch (error) {
    console.log(`Error from the jobhistory catch :- ${error}`);
    res.status(500).json({ status: 500, err: "Something went wrong" });
  }
};

// Apply Job Delete
const seekerapplydel = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const match = await Tbl_jobapply.findById({ _id: id }).populate("js_id");

    if (!match) {
      res.status(401).send({ status: 401, err: "Not Backup" });
      return;
    }

    const newapply = await Tbl_jobapply.findByIdAndDelete({ _id: id });
    res
      .status(201)
      .send({ status: 201, msg: "Application Deleted Successfull" });
  } catch (error) {
    console.log(`Error from the job delete :- ${error}`);
    res.status(500).json({ status: 500, err: "Something went wrong" });
  }
};

// Change Password
const Changepassword = async (req: AuthRequest, res: Response) => {
  try {
    const { oldpwd, updatedpass, updateconpass } = req.body;
    const match = await Tbl_js_signup.findById({ _id: req.user.id });
    if (!match) {
      res.status(401).send({ status: 401, err: "Not Match" });
      return;
    }

    const passverify = await bcrypt.compare(oldpwd, match.js_pwd as string);

    if (!passverify) {
      res.status(401).send({ status: 401, err: "Old Password Not matched" });
      return;
    }

    const oldnewmatch = await bcrypt.compare(
      updatedpass,
      match.js_pwd as string
    );
    if (oldnewmatch) {
      res.status(401).send({
        status: 401,
        err: "New Password & Old Password  Always Diferent",
      });
      return;
    }

    if (!updatedpass && !updateconpass) {
      res.status(401).send({ status: 401, err: "All Field require" });
      return;
    }

    if (!(updatedpass === updateconpass)) {
      res.status(401).send({
        status: 401,
        err: "New Password & Confirm Password Always same",
      });
      return;
    }

    const salt = await bcrypt.genSalt(12);
    const securePass = await bcrypt.hash(updatedpass, salt);
    const newPass = await Tbl_js_signup.findByIdAndUpdate(
      { _id: req.user.id },
      { $set: { js_pwd: securePass } }
    );
    res.status(201).send({
      status: 201,
      newPass,
      msg: "Password Chanege Successfully",
    });
  } catch (error) {
    console.log(`Error from the Change Password ---> ${error} `);
    res.status(500).json({ status: 500, err: "Something went wrong" });
  }
};

const jobdetail = async (req: AuthRequest, res: Response) => {};

export {
  signup,
  signin,
  getseeker,
  seekerverify,
  updateprofile,
  updateimage,
  js_contact,
  applyjob,
  Changepassword,
  mail,
  seekerforgot,
  seekerotpverify,
  seekerapplydel,
  seekerreview,
  jobdetail,
  jobhistory,
  jobapplyrestore,
  getjobedu,
  sekdeleteaccount,
  jobhistoryaccept,
  jobhistoryreject,
  seekercontact,
  get_contact,
  getjobpost,
  jobbackup,
  restorejob,
  sendmsg,
  getseekerreview,
  seekerbackup,
  checkprofile,
};
