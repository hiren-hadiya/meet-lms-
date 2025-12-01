import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";
import sendMail from "../config/sendMail.js";



export const signup = async (req, res) => {
    try {
        const { name, email, password, role , mobile, birthdate, gender, address} = req.body;

        if (!name || !email || !password || !role || !mobile || !birthdate || !gender || !address) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details"
            })
        }

        const existUser = await User.findOne({ email })

        if (existUser) {
            return res.status(400).json({
                success: false,
                message: "User already exist"
            })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            })
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters"
            })
        }

        let hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashPassword,
            role,
            mobile,
            birthdate,
            gender,
            address
        })

        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)  
        })

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: `Signup  error: ${error}`
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details"
            })
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            })
        }

        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorect Password"
            })
        }

        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) 
        })

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: `Login error: ${error}`
        })
    }
}

export const logout = async (req, res) => {
    try {
        await res.clearCookie("token")
        return res.status(200).json({
            success: true,
            message: "User logged out successfully",
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: `Logout error: ${error}`
        })
    }
}

export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Please provide email"
            })
        }
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            })
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString();

        user.resetOtp = otp;
        user.otpExpires = Date.now() + 5 * 60 * 1000;
        user.isOtpVerified = false;

        await user.save();

        await sendMail(email, otp);

        return res.status(200).json({
            success: true,
            message: "OTP sent to your email",
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: `Send OTP error: ${error}`
        })
    }
}

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });
        if (!user || user.resetOtp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            })
        }

        user.isOtpVerified = true;
        user.resetOtp = undefined;
        user.otpExpires = undefined;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully",
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: `Verify OTP error: ${error}`
        })
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !user.isOtpVerified) {
            return res.status(400).json({
                success: false,
                message: "Otp verification is required"
            })
        }
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);
        user.password = hashPassword;
        user.isOtpVerified = false;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: `Reset Password error: ${error}`
        })
    }
}

export const googgleAuth = async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                name,
                email,
                role
            })

            return res.status(201).json({
                success: true,
                message: "User created successfully",
                user: newUser
            })
        }
        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)  // ✅ valid Date
        })
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: `Google Auth error: ${error}`
        })

    }
}