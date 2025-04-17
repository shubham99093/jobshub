import { useEffect, useState } from "react";
import { IIndustrys } from "../utils/types";

const useIndustries = () => {
  const [industries, setIndustries] = useState<IIndustrys[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const calljobs = async () => {
    const configOption = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await fetch(
        "http://localhost:5000/homeviewindustry",
        configOption
      );
      const data: IIndustrys[] = await res.json();
      setIndustries(data);
    } catch (error) {
      setError((error as Error)?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calljobs();
  }, []);

  return { industries, error, loading };
};

export default useIndustries;
