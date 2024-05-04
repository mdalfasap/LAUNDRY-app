import React from "react";
import GroupImage from "../../assets/Frame.png";
import TextField from "@mui/material/TextField";
function useDetails() {
  return (
    <div>
      <div style={{ marginTop: "100px" }}>
        <h1>
          My <br /> Name is..
        </h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TextField
            id="standard-basic"
            label=" Enter your name here"
            variant="standard"
          />
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
          style={{ marginTop: "60px", width: "850px", height: "270px" }}
          src={GroupImage}
          alt=""
        />
        <div
          style={{
            position: "absolute",
            top: "60px",
            marginTop: "80px",
          }}
        >
          <button className="btn btn-primary">Next</button>
        </div>
      </div>
    </div>
  );
}

export default useDetails;
