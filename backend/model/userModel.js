import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    description : {
        type : String,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
    },
    role : {
        type : String,
        enum : ["student","instructor","admin"],
        required : true
    },
    photoUrl : {
        type : String,
        default : ""
    },
    mobile: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required : true
    },
    birthdate: {
        type: Date,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    enrolledCourses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course"
    }],
    resetOtp : {
        type : String,
    },
    otpExpires : {
        type : Date,
    },
    isOtpVerified : {
        type : Boolean,
        default : false
    }
}, {timestamps: true})

const User = mongoose.model("User", userSchema);
export default User;