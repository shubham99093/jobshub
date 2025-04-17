import mongoose from "mongoose";
import {
  Tbl_js_signup,
  Tbl_rec_signup,
  Tbl_jobpost,
  Tbl_industry,
  Tbl_admin,
  Tbl_jobapply,
} from "../models";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.MONGO_URL);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || "", {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error: ", error);
    process.exit(1);
  }
};

const seedData = async () => {
  await connectDB();
  try {
    // Clear existing data
    await Tbl_admin.deleteMany();
    await Tbl_industry.deleteMany();
    await Tbl_js_signup.deleteMany();
    await Tbl_rec_signup.deleteMany();
    await Tbl_jobpost.deleteMany();
    await Tbl_jobapply.deleteMany();

    // Insert Admin
    await Tbl_admin.create({
      adminemail: "admin@example.com",
      adminpwd: "admin123",
    });

    // Insert Industries
    const industries = Array.from({ length: 12 }, (_, i) => ({
      ind_name: `Industry ${i + 1}`,
    }));
    await Tbl_industry.insertMany(industries);

    // Insert Users (Job Seekers & Recruiters)
    const jobSeekersData = Array.from({ length: 15 }, (_, i) => ({
      js_id: `JS${i + 1}`,
      js_name: `Job Seeker ${i + 1}`,
      js_email: `seeker${i + 1}@example.com`,
      js_pwd: "password",
      js_mno: 9000000000 + i,
      js_gender: i % 2 === 0 ? "Male" : "Female",
      js_address: "City XYZ",
      js_quli: "Bachelor's",
      js_hobby: "Reading",
      uni_detail: "XYZ University",
      js_course_type: "Full-Time",
      js_other_skill: "Communication",
      js_course_duration: "2 years",
      js_language: "English",
      js_expierience: i % 5,
      js_exp_company: `Company ${i + 1}`,
    }));
    const jobSeekers = await Tbl_js_signup.insertMany(jobSeekersData);

    const recruiters = Array.from({ length: 12 }, (_, i) => ({
      cmp_name: `Company ${i + 1}`,
      cmp_email: `recruiter${i + 1}@example.com`,
      cmp_pwd: "password",
      industry_cat: `Industry ${i + 1}`,
      rec_mno: 8000000000 + i,
      country: "India",
      state: "Gujarat",
      city: "Ahmedabad",
    }));
    const insertedRecruiters = await Tbl_rec_signup.insertMany(recruiters);

    // Insert Job Posts
    const jobPosts = insertedRecruiters.map((rec, i) => ({
      jobtitle: `Job Title ${i + 1}`,
      gender: i % 2 === 0 ? "Male" : "Female",
      degree: "Bachelor's Degree",
      salaryrange: "50000 - 70000",
      vacancy: i + 1,
      experience: "2-5 years",
      jobtype: "Full-Time",
      qualification: "Relevant Degree",
      skill: "JavaScript, React",
      languageknown: "English, Hindi",
      interviewtype: "Online",
      description: `This is job post ${i + 1} description`,
      designation: "Software Engineer",
      postedate: new Date(),
      postedby: rec._id,
    }));
    const insertedJobs = await Tbl_jobpost.insertMany(jobPosts);

    // Insert Job Applications
    const jobApplications = insertedJobs.map((job, i) => ({
      rec_id: job.postedby,
      js_id: jobSeekers[i % jobSeekers.length]._id,
      resume: `resume${i + 1}.pdf`,
      accept: i % 2,
    }));
    await Tbl_jobapply.insertMany(jobApplications);

    console.log("Database Seeded Successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Seeding Error: ", error);
    mongoose.connection.close();
  }
};

seedData();
