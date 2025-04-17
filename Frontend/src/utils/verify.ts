const getVerify = async (
  user: "seeker" | "recruiter",
  token: string
): Promise<boolean> => {
  let verified: boolean = false;

  if (token) {
    try {
      const responce = await fetch(`http://localhost:5000/verify${user}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          credentials: "includes",
          Authorization: `Bearer ${token}`,
        },
      });
      const data: { verified: boolean } = await responce.json();
      verified = data.verified;
    } catch (err) {
      console.log(err);
      verified = false;
    }

    return verified;
  }
  return verified;
};

export default getVerify;
