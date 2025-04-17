export const navbarMenu = [
  { name: "Home", link: "/recruiterhome" },
  { name: "Add job", link: "/addjob" },
  { name: "Manage Profile", link: "/manageprofile" },
  { name: "Manage Job", link: "/managejob" },
  { name: "Notification", link: "/notification" },
  { name: "Applicant List", link: "/applicantlist" },
  { name: "Payment", link: "/payment" },
  { name: "Contact", link: "/recruitercontact" },
];

export const postJobHelp = [
  {
    title: "Log in",
    description:
      "First you have to login in Job'sHub site then you can post any job.",
    icon: "ti-lock",
  },
  {
    title: "New? Register Now",
    description:
      "If you are not register person then you should register your information to get extra benefits.",
    icon: "ti-user",
  },
  {
    title: "Manage Your Profile",
    description: "You can Manage Your Profile which is shown by job seeker.",
    icon: "ti-pencil-alt",
  },
  {
    title: "Post Job",
    description: "You can post a job by adding information about require job.",
    icon: "ti-pencil",
  },
  {
    title: "Manage Job",
    description:
      "You can manage details of job posts which are posted by you for difference requirements.",
    icon: "ti-settings",
  },
  {
    title: "Receive Message",
    description:
      "Receive seeker details who is apply for your posted job to check and give response.",
    icon: "ti-comment",
  },
];

/* *********** gender option *********  */
export const genderOption = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Both", label: "Both" },
];

/* *********** salary option *********  */
export const salaryoption = [
  { value: "5000 - 15,000", label: "5000 - 15,000" },
  { value: "15,001 - 30,000", label: "15,001 - 30,000" },
  { value: "30,001 - 50,000", label: "30,001 - 50,000" },
  { value: "50,001 - 70,000", label: "50,001 - 70,000" },
  { value: "70,001 - 90,000", label: "70,001 - 90,000" },
  { value: "90,001 - 1,10,000", label: "90,001 - 1,10,000" },
];

/* *********** experinnce option *********  */
export const experienceOption = [
  { value: "0  - 1 years ", label: "0  - 1 years " },
  { value: "1 years - 3 years", label: "1 years - 3 years" },
  { value: "3 years - 5 years", label: "3 years - 5 years" },
  { value: "5 years - a bove ", label: "5 years - above" },
];

/* *********** job option *********  */
export const jobtypeOption = [
  { value: "Part Time", label: "Part Time" },
  { value: "Full Time", label: "Full Time" },
  { value: "Internship", label: "Internship" },
  { value: "Freelancer", label: "Freelancer" },
  { value: "Contract Base", label: "Contract Base" },
];

/* *********** interview option *********  */
export const interviewtypeOption = [
  { value: "In Office", label: "In Office" },
  { value: "TelePhonic", label: "TelePhonic" },
  { value: "Online Platform", label: "Online Platform" },
];

export const qualificationOption = [
  { value: "High School", label: "High School" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Graduation", label: "Graduation" },
  { value: "Master Degree", label: "Master Degree" },
  { value: "M.Phil", label: "M.Phil" },
];

export const worktimeOption = [
  { value: "08:00AM To 5:00PM", label: "08:00AM To 5:00PM" },
  { value: "10:00AM To 4:00PM", label: "10:00AM To 4:00PM" },
  { value: "10:00AM To 6:00PM", label: "10:00AM To 6:00PM" },
  { value: "11:00AM To 7:00PM", label: "11:00AM To 7:00PM" },
];

export const employessOption = [
  { value: "10-50", label: "10-50" },
  { value: "50-100", label: "50-100" },
  { value: "100-500", label: "100-500" },
  { value: "500-1000", label: "500-1000" },
];

export const manageProfileOption = [
  { title: "Profile", to: "/manageprofile", icon: "ti-user" },
  { title: "Job Post Trash", to: "/recruiterjobrestor", icon: "ti-trash" },
  { title: "Edit Profile", to: "/editprofile", icon: "ti-pencil-alt" },
];
