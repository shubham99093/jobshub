import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

const useVerify = (user: "seeker" | "recruiter", token: string): boolean => {
  const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {
    const verify = async () => {
      if (token) {
        try {
          const responce = await fetch(`${BACKEND_URL}/verify${user}`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              credentials: "includes",
              Authorization: `Bearer ${token}`,
            },
          });
          const data: { verified: boolean } = await responce.json();
          setIsVerified(data.verified);
        } catch (err) {
          console.log(err);
          setIsVerified(false);
        }
      }
    };
    verify();
  }, [user, token]);
  return isVerified;
};

export default useVerify;
