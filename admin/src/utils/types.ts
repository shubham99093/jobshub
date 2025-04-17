export interface IIndustrys {
  ind_name: string;
  _id: string;
}

export interface ISeeker {
  _id?: string;
  js_id?: string;
  js_name?: string;
  js_email?: string;
  js_mno?: number;
  js_gender?: string;
  js_address?: string;
  js_quli?: string;
  js_skill?: string;
  js_dob?: Date;
  js_hobby?: string;
  uni_detail?: string;
  js_course_type?: string;
  js_other_skill?: string;
  js_course_duration?: string;
  js_profile?: string;
  js_language?: string;
  js_expierience?: number;
  js_exp_company?: string;
  googleId?: string;
  isBlock?: number | null;
}

export interface IRecruiter {
  _id?: string;
  cmp_name?: string;
  cmp_pwd?: string;
  cmp_email?: string;
  cmp_logo?: string;
  esta_date?: Date;
  cmp_tagline?: string;
  cmp_owner?: string;
  industry_cat?: string;
  rec_mno?: number;
  landline?: string;
  websitelink?: string;
  zipcode?: number;
  country?: string;
  state?: string;
  city?: string;
  employess?: string | null;
  worktime?: string;
  cmp_address?: string;
  google?: string;
  twitter?: string;
  linkdin?: string;
  js_salary?: string;
  ispaid?: string | null;
  isBlock?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IApplicationList {
  _id: string;
  isApplied: boolean;
  js_id: {
    js_name: string;
    js_email: string;
    js_profile: string;
    js_mno: number;
    js_gender: string;
  };
}

export interface IJobPost {
  _id?: string;
  jobtitle?: string;
  gender?: string;
  degree?: string;
  salaryrange?: string;
  vacancy?: number;
  experience?: string;
  jobtype?: string;
  qualification?: string;
  skill?: string;
  languageknown?: string;
  interviewtype?: string;
  description: string;
  designation?: string;
  postedate?: Date;
  postedby?: IRecruiter;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IJobApplication {
  _id: string;
  rec_id: string;
  js_id: ISeeker;
  resume?: string;
  show?: boolean;
  accept: boolean;
  createdAt?: Date;
  updaredAt?: Date;
}

export interface ICategoryry {
  value: string;
  label: string;
}

export interface IExtendedJob extends IJobPost {
  rec_id?: IRecruiter;
  js_id?: ISeeker;
  resume?: string;
  show?: boolean;
  accept?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRecruiterContact {
  _id?: string;
  rec_id?: string | IRecruiter;
  cont_sub?: string;
  cont_msg?: string;
}

export interface ISeekerContact {
  _id?: string;
  seeker_id?: ISeeker | string;
  cont_sub?: string;
  cont_msg?: string;
}

export interface IRecruiterReview {
  _id?: string;
  recruiter_id?: string | IRecruiter;
  ratingstar?: number;
  review?: string;
}

export interface ISeekerReview {
  _id?: string;
  seeker_id?: string | ISeeker;
  ratingstar?: number;
  review?: string;
}

export interface IPayment {
  _id: string;
  paymentby: string | IRecruiter;
  packagename: string;
  amount: number;
  jobpostcount: number;
  payment_id: string;
  ispaid: string;
}
