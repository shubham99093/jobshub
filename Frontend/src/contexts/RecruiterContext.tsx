import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { IRecruiter } from "../utils/types";
import { getUser } from "./common";
import Loader from "../components/Loader";

interface RecruiterContextType {
  recruiter: IRecruiter | null;
  setRecruiter: (user: IRecruiter | null) => void;
  isVerified: boolean;
  setIsVerified: (isVerified: boolean) => void;
  loading: boolean;
  accesstoken: string | null;
  setAccesstoken: (token: string | null) => void;
}

const RecruiterContext = createContext<RecruiterContextType | undefined>(
  undefined
);

export const RecruiterProvider = ({ children }: { children: ReactNode }) => {
  const [recruiter, setRecruiter] = useState<IRecruiter | null>(null);
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [accesstoken, setAccesstoken] = useState(
    localStorage.getItem("recruiterToken")
  );

  useEffect(() => {
    const token = localStorage.getItem("recruiterToken");

    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const data = await getUser(token, "recruiter");
        setRecruiter(data);
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
    <RecruiterContext.Provider
      value={{
        recruiter,
        setRecruiter,
        isVerified,
        setIsVerified,
        loading,
        accesstoken,
        setAccesstoken,
      }}
    >
      {loading ? <Loader /> : children}
    </RecruiterContext.Provider>
  );
};

export const useRecruiter = () => {
  const context = useContext(RecruiterContext);
  if (!context)
    throw new Error("useRecruiter must be used within a RecruiterProvider");
  return context;
};
