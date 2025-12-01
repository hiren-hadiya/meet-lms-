import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.USER_EMAIL, 
    pass: process.env.USER_PASSWORD,
  },
});

const sendMail = async (to,otp) => {
    const info = await transporter.sendMail({
    from: process.env.USER_EMAIL, 
    to: to,
    subject: "Reset Your LMS  Password ✔",
    html: `<p>Your OTP for password reset is: <b>${otp}</b> It expires is 5 minutes.</p>`,
  })
}

export default sendMail;