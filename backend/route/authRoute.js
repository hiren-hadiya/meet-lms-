import express from "express";
import { googgleAuth, login, logout, resetPassword, sendOtp, signup, verifyOtp } from "../controller/authController.js";

const authRoute = express.Router();

authRoute.post("/signup", signup)
authRoute.post("/login", login)
authRoute.get("/logout", logout)

authRoute.post("/sendotp", sendOtp)
authRoute.post("/verifyotp", verifyOtp)
authRoute.post("/resetpassword", resetPassword)

authRoute.post("/googgleauth", googgleAuth)

export default authRoute;