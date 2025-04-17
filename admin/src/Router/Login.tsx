import { useState } from "react";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";
import { useAdmin } from "../context/adminContext";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [clicked, setClicked] = useState(false);
  const [OTP, setOTP] = useState("");

  const { setAccesstoken } = useAdmin();
  const navigate = useNavigate();

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleOtpButton = async () => {
    try {
      if (!email) {
        toast.error("Please enter email");
        return;
      }

      if (!isValidEmail(email)) {
        toast.error("Invalid email format");
        return;
      }
      const responce = await fetch(`${BACKEND_URL}/sendotp`, {
        method: "POST",
        body: JSON.stringify({ adminemail: email }),
        headers: { "Content-Type": "application/json" },
      });

      const result: { status: number; OTP: number; error: string } =
        await responce.json();

      if (result.status !== 201 || result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("OTP sent successfully");
      setClicked(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = async () => {
    try {
      if (!email) {
        toast.error("Please enter email");
        return;
      }

      if (!isValidEmail(email)) {
        toast.error("Invalid email format");
        return;
      }
      const responce = await fetch(`${BACKEND_URL}/adsignin`, {
        method: "POST",
        body: JSON.stringify({ adminemail: email, otp: OTP }),
        headers: { "Content-Type": "application/json" },
      });

      const result: {
        status: number;
        OTP: number;
        tok: string;
        error: string;
      } = await responce.json();

      if (result.status !== 201 || result.error) {
        toast.error(result.error);
        return;
      }
      localStorage.setItem("token", result.tok);
      setAccesstoken(result.tok);
      navigate("/");
      toast.success("Signin Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/img/bg.jpg')" }}
    >
      <h2 className="text-5xl mb-10 ">JOB'S HUB</h2>
      <div className="bg-white p-10 shadow-lg rounded-lg w-102 text-center">
        {clicked ? (
          <>
            <h3 className="text-2xl mb-4">Administrator Login</h3>
            <p className="">OTP</p>
            <div className="flex justify-center ">
              <OTPInput
                value={OTP}
                numInputs={6}
                renderSeparator={<span>-</span>}
                onChange={setOTP}
                inputType="number"
                inputStyle={{
                  display: "flex",
                  border: "1px solid black",
                  borderRadius: "5px",
                  borderColor: "gray",
                  textAlign: "center",
                  color: "black",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "45px",
                  height: "45px",
                }}
                renderInput={(props) => <input {...props} />}
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full mt-3 bg-blue-600 text-white p-2  rounded hover:bg-blue-700 "
            >
              Login
            </button>
          </>
        ) : (
          <>
            <label className="block text-left mb-2 text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <button
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
              onClick={handleOtpButton}
            >
              OTP Verify
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default Login;
