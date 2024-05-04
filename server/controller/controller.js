import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { EMAIL, PASSWORD } from "../env.js";
import UserModel from "../Model/userModel.js";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
// import twilio from "twilio";
import dotenv from 'dotenv';
dotenv.config();
import { channel } from "diagnostics_channel";
// const servicSSID = "VAef4e0f2ff4743921f9830159c3f54241";
// // const accountSid = "AC6df97b635a400643121721240d35945e";
// const authToken = "9c40bf21f326572be41cbfd8584137c6";

// const client = twilio(process.env.accountSid, authToken);

// Now you can use the client object to send messages, make calls, etc.

export async function register(req, res) {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numberRegex = /^\d+$/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    const { name, emailOrNumber, password, confirmPassword } = req.body;

    if (!emailOrNumber) {
      return res
        .status(400)
        .json({ error: "Please enter email or phone number" });
    }
    if (!name) {
      return res.status(400).send({ error: "Please enter first name" });
    }

    if (!emailRegex.test(emailOrNumber) && !numberRegex.test(emailOrNumber)) {
      return res
        .status(400)
        .json({ error: "Please enter a valid email or phone number" });
    }

    const existEmail = await UserModel.findOne({ email: emailOrNumber });
    if (existEmail) {
      return res.status(400).send({ error: "Please use a unique email" });
    }

    const existNumber = await UserModel.findOne({ number: emailOrNumber });
    if (existNumber) {
      return res
        .status(400)
        .send({ error: "Please use a unique phone number" });
    }

    if (!password) {
      return res.status(400).send({ error: "Password is required" });
    }

    if (!specialCharRegex.test(password)) {
      return res.status(400).send({
        error: "Password should contain at least one special character",
      });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .send({ error: "Password should be at least 6 characters" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .send({ error: "Password and confirm password are not the same" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      email: emailRegex.test(emailOrNumber) ? emailOrNumber : undefined,
      number: !emailRegex.test(emailOrNumber) ? emailOrNumber : undefined,
      password: hashPassword,
      name,
    });

    await user.save();

    return res
      .status(201)
      .send({ error: false, msg: "User registered successfully" });
  } catch (error) {
    if (error.code === 11000 && error.keyValue.email === null) {
      return res.status(400).send({ error: "Email cannot be null" });
    }
    return res
      .status(500)
      .send({ error: error.message || "Internal Server Error" });
  }
}

const sendOtpEmail = async (userEmail) => {
  try {
    // const { userEmail } = req.body;

    // Generate OTP
    const otp = generateOTP(); // Generate 6-digit OTP

    function generateOTP() {
      let otp = "";
      for (let i = 0; i < 4; i++) {
        otp += Math.floor(Math.random() * 10); // Generate a random number between 0 to 9
      }
      return otp;
    }

    let config = {
      service: "gmail",
      auth: {
        user: EMAIL, // Replace with your Gmail email
        pass: PASSWORD, // Replace with your Gmail password
      },
    };

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Laundry",
        link: "https://mailgen.js/",
      },
    });

    let response = {
      body: {
        name: "Welcome",
        intro: `Your OTP is ${otp}`,
        outro: "Please use this OTP to verify your email.",
      },
    };

    let mail = MailGenerator.generate(response);

    let message = {
      from: EMAIL, // Replace with your Gmail email
      to: userEmail,
      subject: "OTP Verification",
      html: mail,
    };

    await transporter.sendMail(message);

    return {
      msg: "OTP has been sent to your email",
      otp: otp,
    };
  } catch (error) {
    console.error("Error occurred: ", error);
    throw new Error("Failed to send OTP");
  }
};


export async function login(req, res) {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numberRegex = /^\d+$/;

    const { emailOrNumber, password } = req.body;

    if (!emailOrNumber) {
      return res
        .status(400)
        .json({ error: "Please enter email or phone number" });
    }

    let user;

    if (emailRegex.test(emailOrNumber)) {
      if (!emailRegex.test(emailOrNumber)) {
        return res.status(400).json({ error: "Please enter a valid email" });
      }
      user = await UserModel.findOne({ email: emailOrNumber });
    } else if (!numberRegex.test(emailOrNumber)) {
      return res
        .status(400)
        .json({ error: "Please enter a valid phone number" });
    } else {
      user = await UserModel.findOne({ number: emailOrNumber });
    }

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (!password) {
      return res.status(400).json({ error: "Please enter password" });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
     
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }


    // const verification = await client.verify.v2
    // .services(servicSSID)
    // .verifications.create({
    //   to: `+91${emailOrNumber}`,
    //   channel: "sms",
    // });

    // If you want to send OTP after successful password verification
    sendOtpEmail(user.email); // Assuming you have a function named sendOtp

    return res.status(200).send({ error: false, msg: "OTP sent successfully" });
  }catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .send({ error: error.message || "Internal Server Error" });
  }
}
export async function verifyOtp(req, res) {
  try {
    const { verificationCode  } = req.body;

    if (!verificationCode ) {
      return res
        .status(400)
        .json({ error: "Verification code and phone number are required" });
    }

    // const verificationCheck = await client.verify.v2
    //   .services(servicSSID)
    //   .verificationChecks.create({
    //     to:"+918590712033",
    //     code: verificationCode, 
    //   });

    if (verificationCheck.status === "approved") {
      // Verification successful  
      return res
        .status(200) 
        .json({ success: true, msg: "OTP verified successfully" });
    } else {
      // Verification failed  
      return res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("OTP verification error:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
}
   

                          
// export async function emailverifyOtp(req, res) {
//   const email = req.body.email;
//   const code = req.body.code;

//   if (!email || !code) {
//     return res.status(400).send("Email address and verification code are required");
//   }

//   if (verificationCodes[email] && verificationCodes[email] == code) {
//     // Verification successful
//     delete verificationCodes[email];
//     return res.status(200).send("Email verified successfully");
//   } else {
//     return res.status(400).send("Invalid verification code");
//   }
// }
