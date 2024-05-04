import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GroupImage from "../../assets/Frame.png";

function Register() {
  const [formData, setFormData] = useState({
    emailOrNumber: "",
    number: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/register",
        formData
      );
      console.log(response.data);
      toast.success(response.data.msg);
      navigate("/login");
    } catch (error) {
      console.error(
        "Registration error:",
        error.response ? error.response.data : error
      );
      toast.error(
        error.response ? error.response.data.error : "please fill this "
      );
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
            Hey There !<br />
            Welcome
          </h1>
          <div style={{ position: "absolute", top: "-60px" }}>
            <img style={{}} src={GroupImage} alt="" />
          </div>
        </div>
        <div
          className="col-md-6"
          style={{ marginTop: "60px", marginLeft: "-80px" }}
        >
          <form onSubmit={handleSubmit}>
            <div className="inputText">
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <input
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <input
                  type="text"
                  placeholder="Enter Email ID or Phone Number"
                  id="emailOrNumber"
                  name="emailOrNumber"
                  value={formData.emailOrNumber}
                  onChange={handleChange}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <input
                  type="password"
                  placeholder="Confirm password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button type="submit" className="btn btn-primary w-333">
                Register
              </button>
            </div>
          </form>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <p style={{ marginTop: "10px", color: "#FFFF" }}>
              {" "}
              Already have an account? <Link to="/">Log In</Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default Register;
