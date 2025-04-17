import { BACKEND_URL } from "../config";

export const getData = async (token: string, url: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/${url}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        credentials: "includes",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
