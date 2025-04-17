import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import LoadingPage from "../components/LoadingPage";
import {
  IIndustrys,
  IPayment,
  IRecruiter,
  IRecruiterContact,
  IRecruiterReview,
  ISeeker,
  ISeekerContact,
  ISeekerReview,
} from "../utils/types";
import { getData } from "../utils/getData";

interface AdminContextType {
  recruiter: IRecruiter[] | null;
  setRecruiter: (user: IRecruiter[] | null) => void;
  seeker: ISeeker[] | null;
  setSeeker: (user: ISeeker[] | null) => void;
  industry: IIndustrys[] | null;
  setIndustry: (user: IIndustrys[] | null) => void;
  recruiterContect: IRecruiterContact[] | null;
  seekerContect: ISeekerContact[] | null;
  recruiterReview: IRecruiterReview[] | null;
  seekerReview: ISeekerReview[] | null;
  payment: IPayment[] | null;
  loading: boolean;
  accesstoken: string | null;
  setAccesstoken: (token: string | null) => void;
  show: "all" | "user" | "industry" | "contect" | "review";
  setShow: (show: "all" | "user" | "industry" | "contect" | "review") => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [recruiter, setRecruiter] = useState<IRecruiter[] | null>(null);
  const [seeker, setSeeker] = useState<ISeeker[] | null>(null);
  const [industry, setIndustry] = useState<IIndustrys[] | null>(null);
  const [recruiterContect, setRecruiterContect] = useState<
    IRecruiterContact[] | null
  >(null);
  const [seekerContect, setSeekerContect] = useState<ISeekerContact[] | null>(
    null
  );
  const [recruiterReview, setRecruiterReview] = useState<
    IRecruiterReview[] | null
  >(null);
  const [seekerReview, setSeekerReview] = useState<ISeekerReview[] | null>(
    null
  );
  const [payment, setPayment] = useState<IPayment[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [accesstoken, setAccesstoken] = useState(localStorage.getItem("token"));

  const [show, setShow] = useState<
    "all" | "user" | "industry" | "contect" | "review"
  >("all");

  useEffect(() => {
    if (!accesstoken) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const recruiterData = await getData(accesstoken, "totalrecruiterlist");
        const seekerData = await getData(accesstoken, "totalseekerlist");
        const industryData = await getData(accesstoken, "viewindustry");
        const recruiterContectData = await getData(accesstoken, "recruitercon");
        const seekerContectData = await getData(accesstoken, "getseekercon");
        const recruiterReviewData = await getData(
          accesstoken,
          "getrecruiterreviewall"
        );
        const seekerReviewData = await getData(
          accesstoken,
          "getseekerreviewall"
        );
        const PaymentData = await getData(accesstoken, "payment");
        setRecruiter(recruiterData);
        setSeeker(seekerData);
        setIndustry(industryData);
        setRecruiterContect(recruiterContectData);
        setSeekerContect(seekerContectData);
        setRecruiterReview(recruiterReviewData);
        setSeekerReview(seekerReviewData);
        setPayment(PaymentData);
      } catch {
        setRecruiter(null);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchUser();
  }, [accesstoken]);

  return (
    <AdminContext.Provider
      value={{
        recruiter,
        setRecruiter,
        seeker,
        setSeeker,
        industry,
        setIndustry,
        recruiterContect,
        seekerContect,
        recruiterReview,
        seekerReview,
        payment,
        loading,
        accesstoken,
        setAccesstoken,
        show,
        setShow,
      }}
    >
      {loading ? <LoadingPage /> : children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context)
    throw new Error("useRecruiter must be used within a RecruiterProvider");
  return context;
};
