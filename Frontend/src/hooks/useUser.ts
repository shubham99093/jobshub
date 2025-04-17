import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

const useUser = <T>(token: string) => {
  const [user, setUser] = useState<T | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/getseeker`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            credentials: "includes",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [token]);

  return user;
};

export default useUser;
