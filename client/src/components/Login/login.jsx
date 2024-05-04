import React from "react";
import {  useNavigate } from 'react-router-dom'
import "./login.css";
import GroupImage from "../../assets/Group 1139.png";
import MainImage from "../../assets/Group 1090.png";

function Login() {
  const navigate = useNavigate()
  const navigateToLogin = () => {
    navigate('/login')
  };

  const navigateToRegister = () => {
    navigate('/register')
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 md-5">
          <img src={GroupImage} alt="" />

          <div style={{ marginLeft: "52px", marginTop: "18px" }}>
            <div className="LoremText" style={{ display: "flex", textAlign: "center" }}>
              <h3>
                Lorem ipsum <br />
                Lorem ipsumLorem
              </h3>
            </div>
            <span
              style={{
                display: "flex",
                textAlign: "center",
                marginTop: "30px",
                color: "white",
                fontSize: "10px",
                marginLeft: "13px",
              }}
            >
              <p style={{ fontSize: "12px" }}>
                Lorem Ipsum has been the industry's <br /> standardLorem Ipsum
                has
              </p>
                
            </span>
          </div>
        </div>
        <div className="col-md-6">
          <div style={{ display: "flex", justifyContent: "center", marginTop: "60px" }}>
            <img src={MainImage} alt="" />
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            {/* <TextField id="standard-basic" label="Enter Here" variant="standard"/> */}
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
            <button className="btn btn-primary" onClick={navigateToLogin}>
              Login
            </button>
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
            <button
              style={{
                backgroundColor: "#1FACF3",
                color: "#FFFF",
                border: "1px solid #ffff",
              }}
              className="btn btn-primary"
              onClick={navigateToRegister}
            > 
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
