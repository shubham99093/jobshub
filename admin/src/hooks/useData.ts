import { useEffect, useState } from "react";

const useUser = <T>(url: string, token: string) => {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/" + url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            credentials: "includes",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [token, url]);

  return data;
};

export default useUser;
