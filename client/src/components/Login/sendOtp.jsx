import React, { useState } from "react";
import axios from "axios";
import GroupImage from "../../assets/Frame.png";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function SendOtp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOtp({
      ...otp,
      [name]: value,
    });
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (!otp) { 
      toast.error("Please enter the OTP.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/verifyOtp", { otp });
      console.log(response.data);
      toast.success(response.data.msg);
      navigate("/"); 
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div>
      <div style={{ marginTop: "100px" }}>
        <h1>
          We have sent <br />
          you an OTP
        </h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <MuiOtpInput
            value={otp}
            onChange={handleChange}
            style={{ width: "250px" }}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <h1 style={{ fontSize: "12px" }}>Don’t receive OTP? RESEND OTP</h1>
        </div>
      </div>
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          style={{ marginTop: "", width: "850px", height: "270px" }}
          src={GroupImage}
          alt=""
        />
        <div
          style={{
            position: "absolute",
            top: "60px",
            marginTop: "30px",
          }}
        >
          <button className="btn btn-primary" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default SendOtp;
