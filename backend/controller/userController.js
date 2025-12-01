import User from "../model/userModel.js";
import uploadOnCloudinary  from "../config/cloudinary.js";

export const getCurentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password").populate("enrolledCourses");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.log(error);
         return res.status(500).json({
            success : false,
            message : `getCurrent user error : ${error}`
        })
    }
}

export const updateProfile = async (req, res) => {
    try {
        let userid = req.userId;
        // console.log("ddd",userid);
        const {description, name} =  req.body;

        let photoUrl
        if(req.file){
            photoUrl = await uploadOnCloudinary(req.file.path);
        }

        const user  = await User.findByIdAndUpdate(userid, {name, description, photoUrl},{ new: true })
        
        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not found"
            })
        }

        await user.save();

        return res.status(200).json({
            success : true,
            message : "Profile updated successfully",
            user 
        })
    } catch (error) {
         console.log(error);
         return res.status(500).json({
            success : false,
            message : `Update Profile Error : ${error}`
        })
    }
}