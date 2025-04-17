import { BACKEND_URL } from "../config";

export const getUser = async (token: string, user: "seeker" | "recruiter") => {
  try {
    const res = await fetch(`${BACKEND_URL}/get${user}`, {
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
