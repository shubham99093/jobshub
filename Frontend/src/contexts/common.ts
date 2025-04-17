export const getUser = async (token: string, user: "seeker" | "recruiter") => {
  try {
    const res = await fetch(`http://localhost:5000/get${user}`, {
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
