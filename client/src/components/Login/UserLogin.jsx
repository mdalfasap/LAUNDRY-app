import React, { useState } from "react";
import axios from "axios";
import GroupImage from "../../assets/Frame.png";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function UserLogin() {
  const [formData, setFormData] = useState({
    emailOrNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        formData
      );

      console.log(response.data);
      toast.success(response.data.msg);
      navigate("/sendOtp");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Pleae enter !");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div
          className="col-md-6"
          style={{ marginTop: "200px", position: "relative" }}
        >
          <h1>
            Welcome back! Glad <br /> to see you, Again!
          </h1>
          <div style={{ position: "absolute", top: "-60px" }}>
            <img style={{}} src={GroupImage} alt="" />
          </div>
        </div>
        <div
          className="col-md-6"
          style={{ marginTop: "160px", marginLeft: "-80px" }}
        >
          <form onSubmit={handleSubmit}>
            <div className="inputText">
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <input
                  type="text"
                  placeholder="Enter Email ID or Phone Number"
                  name="emailOrNumber"
                  id="emailOrNumber"
                  value={formData.emailOrNumber}
                  onChange={handleChange}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                />
              </div>
              <p
                style={{
                  color: "#FFFF",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Link to="/">Forgot Password?</Link>
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button type="submit" className="btn btn-primary w-333">
                Log In
              </button>
            </div>
          </form>
          <p
            style={{
              marginTop: "10px",
              color: "#FFFF",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            Already have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default UserLogin;
