import { Request, Response } from "express";
import fs from "fs";
import jwt from "jsonwebtoken";
import csv from "fast-csv";
import Razorpay from "razorpay";
import crypto from "crypto";
import "dotenv/config";

import {
  Tbl_rec_signup,
  Tbl_jobpost,
  Tbl_jobapply,
  Tbl_payment,
} from "../models";

interface AuthRequest extends Request {
  user?: any;
}

const jobpost = async (req: AuthRequest, res: Response) => {
  try {
    const data = await Tbl_payment.findOne({ paymentby: req.user.id });
    const {
      jobtitle,
      gender,
      designation,
      salaryrange,
      vacancy,
      experience,
      jobtype,
      qualification,
      degree,
      skill,
      languageknown,
      interviewtype,
      description,
    } = req.body;

    // Validate required fields
    if (
      !jobtitle ||
      !gender ||
      !designation ||
      !salaryrange ||
      !vacancy ||
      !experience ||
      !jobtype ||
      !qualification ||
      !skill ||
      !languageknown ||
      !interviewtype ||
      !description ||
      !degree
    ) {
      res.status(400).send({ status: 400, msg: "All fields are required" });
      return;
    }

    // Check recruiter profile
    const profile = await Tbl_rec_signup.findById(req.user.id);
    if (!profile) {
      res.status(404).send({ status: 404, msg: "Recruiter not found" });
      return;
    }

    if (!profile.employess) {
      res
        .status(400)
        .send({ status: 101, msg: "Please complete your profile first!" });
      return;
    }

    // Check payment plan and job post limit
    if (!data) {
      res.status(403).send({
        status: 100,
        msg: "You have not bought any subscription. Please buy one!",
      });
      return;
    }

    const jobLimits = { PLATINUM: 4, GOLD: 2, SILVER: 1 };
    if (
      data.packagename in jobLimits &&
      data.jobpostcount >= jobLimits[data.packagename as keyof typeof jobLimits]
    ) {
      res.status(400).send({
        status: 400,
        msg: `Your job post limit is over for ${data.packagename} package`,
      });
      return;
    }

    // Post the job
    const newJobPost = await Tbl_jobpost.create({
      postedby: req.user._id,
      jobtitle,
      gender,
      designation,
      degree,
      salaryrange,
      vacancy,
      experience,
      jobtype,
      qualification,
      skill,
      languageknown,
      interviewtype,
      description,
    });

    // Update job post count
    await Tbl_payment.findOneAndUpdate(
      { paymentby: req.user.id },
      { $inc: { jobpostcount: 1 } },
      { new: true }
    );

    res.status(200).send({ status: 200, msg: "Job posted successfully!" });
  } catch (error) {
    console.error(`Error in Job Post: ${error}`);
    res.status(500).send({ status: 500, error: "Internal Server Error" });
  }
};

const getOwnJobpost = async (req: AuthRequest, res: Response) => {
  try {
    const response = await Tbl_jobpost.find({
      postedby: req.user._id,
      isDeleted: { $eq: true },
    }); //.sort(created = -1);//.select('-postedby');
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: 500, error: "Internal Server Error" });
  }
};

const restorejobPost = async (req: Request, res: Response) => {
  try {
    const jobid = req.params.id;
    const updatedJob = await Tbl_jobpost.findByIdAndUpdate(
      { _id: jobid },
      { $set: { isDeleted: false } },
      { new: true }
    );

    if (!updatedJob) {
      res.status(404).send({ message: "Job not found", status: 404 });
      return;
    }

    res.send({ message: "Remove success", status: 200 });
  } catch (error) {
    res.status(500).send({ status: 500, error: "Internal Server Error" });
  }
};

const updaterestorejobpost = async (req: Request, res: Response) => {
  try {
    const jobid = req.params.id;
    const updatedJob = await Tbl_jobpost.findByIdAndUpdate(
      { _id: jobid },
      { $set: { isDeleted: true } },
      { new: true }
    );

    if (!updatedJob) {
      res.status(404).send({ message: "Job not found", status: 404 });
      return;
    }

    res.status(201).send({ message: "Job Post Restored", status: 201 });
  } catch (error) {
    res.status(500).send({ status: 500, error: "Internal Server Error" });
  }
};

const deletejobPost = async (req: Request, res: Response) => {
  try {
    const jobid = req.params.id;

    const deletedJob = await Tbl_jobpost.findByIdAndDelete(jobid);

    if (!deletedJob) {
      res.status(404).send({ message: "Job not found", status: 404 });
      return;
    }

    res.status(200).send({ message: "Job deleted successfully", status: 200 });
  } catch (error) {
    res.status(500).send({ status: 500, error: "Internal Server Error" });
  }
};

const trashgetOwnJobpost = async (req: AuthRequest, res: Response) => {
  try {
    const response = await Tbl_jobpost.find({
      postedby: req.user._id,
      isDeleted: false,
    }).sort({ createdAt: -1 });

    res.status(200).send(response);
  } catch (error) {
    console.error("Error fetching job posts:", error);
    res.status(500).send({ status: 500, error: "Internal Server Error" });
  }
};

const getperticularJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "Job ID is required" });
      return;
    }

    const jobData = await Tbl_jobpost.findById(id).populate("postedby");

    if (!jobData) {
      res.status(404).json({ error: "Job not found" });
      return;
    }

    res.status(200).json({ message: "Success", data: jobData });
  } catch (error) {
    console.error("Error fetching job details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updatejob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!updateData || Object.keys(updateData).length === 0) {
      res.status(400).json({ error: "Update data is required" });
      return;
    }

    const updatedJob = await Tbl_jobpost.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedJob) {
      res.status(404).json({ error: "Job not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Job updated successfully", data: updatedJob });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const jobtype = async (req: AuthRequest, res: Response) => {
  try {
    const { jobtype } = req.body;
    if (!jobtype) {
      res.status(401).send({ error: "All Field Required", status: 400 });
    }
    const job = await Tbl_jobpost.find({ jobtype: { $in: [jobtype] } });
    res.status(201).send({ job, status: 200 });
  } catch (error) {
    res.status(401).send({ error: `Error from the jobtype ==> ${error} ` });
  }
};

const location = async (req: AuthRequest, res: Response) => {
  try {
    const { location } = req.body;

    if (!location) {
      res.status(401).json({ error: "Location is required", status: 401 });
      return;
    }
    const jobs = await Tbl_jobpost.find({ joblocation: { $in: [location] } });
    if (jobs.length === 0) {
      res
        .status(401)
        .json({ error: "No jobs available in this location", status: 401 });
      return;
    }

    res.status(201).json({ status: 201, jobs });
  } catch (error) {
    res.status(401).send({ error: `Error from the jobtype ==> ${error} ` });
  }
};

const exportcsv = async (req: Request, res: Response) => {
  try {
    // ✅ Extract JWT from Authorization Header (Not URL)
    const token = req.params.token;
    if (!token) {
      res.status(401).json({ error: "Unauthorized access", status: 401 });
      return;
    }

    // ✅ Verify JWT Token
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY as string);
    if (!decoded?.cmpid) {
      res.status(403).json({ error: "Invalid token", status: 403 });
      return;
    }

    // ✅ Fetch Data
    const result: any = await Tbl_jobapply.find({
      rec_id: decoded.cmpid,
      accept: 1,
    }).populate("js_id");

    if (result.length === 0) {
      res.status(404).json({ error: "No data found", status: 404 });
      return;
    }

    if (!fs.existsSync("public/files/export")) {
      if (!fs.existsSync("public/files")) {
        fs.mkdirSync("./public/files/");
      }
      if (!fs.existsSync("public/files/export")) {
        fs.mkdirSync("./public/files/export");
      }
    }

    // ✅ CSV File Path
    const writableStream = fs.createWriteStream("public/files/export/user.csv");
    const csvStream = csv.format({ headers: true });

    csvStream.pipe(writableStream);

    // ✅ Write Data to CSV
    result.forEach((user: any) => {
      csvStream.write({
        Name: user?.js_id?.js_name || "-",
        EmailId: user?.js_id?.js_email || "-",
        ContactNo: user?.js_id?.js_mno || "-",
      });
    });

    csvStream.end();

    writableStream.on("finish", () => {
      res.status(200).json({
        status: 200,
        downloadurl: `http://localhost:3000/files/export/user.csv`,
      });
    });
  } catch (error) {
    console.error("Error in exportCsv:", error);
    res.status(500).json({ error: "Internal Server Error", status: 500 });
  }
};

const order = (req: AuthRequest, res: Response) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZOR_KEY_ID as string,
      key_secret: process.env.RAZOR_KEY_SECRET as string,
    });

    const options = {
      amount: req.body.amount * 100, // amount in the smallest currency unit
      currency: "INR",
    };
    instance.orders.create(options, function (err, order) {
      if (err) {
        res.send({ status: 500, message: "order failed" });
      } else {
        res.send({ status: 200, message: "order created", data: order });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", status: 500 });
  }
};

const verify = async (req: AuthRequest, res: Response) => {
  try {
    const body =
      req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZOR_KEY_SECRET as string)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === req.body.razorpay_signature) {
      const user = await Tbl_payment.findOne({ paymentby: req.user.id });
      if (user) {
        const result = await Tbl_payment.findOneAndUpdate(
          {
            paymentby: req.user.id,
          },
          {
            packagename: req.body.packagename,
            amount: req.body.amount,
            jobpostcount: 0,
            payment_id: req.body.razorpay_payment_id,
          }
        );
        res.send({ message: "payment success", status: 200 });
      } else {
        const result = await Tbl_payment.create({
          paymentby: req.user.id,
          packagename: req.body.packagename,
          jobpostcount: 0,
          ispaid: "done",
          payment_id: req.body.razorpay_payment_id,
        });
        res.send({ message: "payment success", status: 200 });
      }
    } else res.send({ message: "payment failed", status: 400 });
  } catch (error) {
    console.log(error);
  }
};

export {
  jobpost,
  getOwnJobpost,
  deletejobPost,
  updatejob,
  getperticularJob,
  exportcsv,
  order,
  verify,
  trashgetOwnJobpost,
  restorejobPost,
  updaterestorejobpost,
  jobtype,
  location,
};
