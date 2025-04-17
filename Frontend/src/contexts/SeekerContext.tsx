import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ISeeker } from "../utils/types";
import { getUser } from "./common";
import Loader from "../components/Loader";

interface SeekerContextType {
  seeker: ISeeker | null;
  setSeeker: (user: ISeeker | null) => void;
  isVerified: boolean;
  setIsVerified: (isVerified: boolean) => void;
  loading: boolean;
  accesstoken: string | null;
  setAccesstoken: (token: string | null) => void;
}

const SeekerContext = createContext<SeekerContextType | undefined>(undefined);

export const SeekerProvider = ({ children }: { children: ReactNode }) => {
  const [seeker, setSeeker] = useState<ISeeker | null>(null);
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [accesstoken, setAccesstoken] = useState(
    localStorage.getItem("seekerToken")
  );
  useEffect(() => {
    const token = localStorage.getItem("seekerToken");

    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const data = await getUser(token, "seeker");
        setSeeker(data);
      } catch {
        setSeeker(null);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchUser();
  }, [accesstoken]);

  return (
    <SeekerContext.Provider
      value={{
        seeker,
        setSeeker,
        isVerified,
        setIsVerified,
        loading,
        accesstoken,
        setAccesstoken,
      }}
    >
      {loading ? <Loader /> : children}
    </SeekerContext.Provider>
  );
};

export const useSeeker = () => {
  const context = useContext(SeekerContext);
  if (!context)
    throw new Error("useSeeker must be used within a SeekerProvider");
  return context;
};
