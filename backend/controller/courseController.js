import uploadOnCloudinary from "../config/cloudinary.js"
import Course from "../model/courseModel.js"
import Lecture from "../model/lectureModel.js"
import User from "../model/userModel.js"

// GET /api/course/search?query=javascript

export const searchCourses = async (req, res) => {
  try {
    const query = req.query.query;

    const courses = await Course.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } }
      ]
    });

    return res.json(courses);

  } catch (error) {
    res.status(500).json({ message: "Search failed" });
  }
};

// create Courses
export const createCourse = async (req,res) => {

    try {
        const {title,category} = req.body
        if(!title || !category){
            return res.status(400).json({message:"title and category is required"})
        }
        const course = await Course.create({
            title,
            category,
            creator: req.userId,
            status: "draft", // ✔ FIXED
        })
        
        return res.status(201).json(course)
    } catch (error) {
         return res.status(500).json({message:`Failed to create course ${error}`})
    }
    
}

export const getPublishedCourses = async (req,res) => {
    try {
        const courses = await Course.find({isPublished:true}).populate("lectures reviews")
    //     .populate({
    //     path: "lectures",
    //     select: "lectureTitle videoUrl isPreviewFree duration description", // select fields you need
    //   })
        if(!courses)
        {
            return res.status(404).json({message:"Course not found"})
        }

        return res.status(200).json(courses)
        
    } catch (error) {
          return res.status(500).json({message:`Failed to get All  courses ${error}`})
    }
}


export const getCreatorCourses = async (req,res) => {
    try {
        const userId = req.userId
        const courses = await Course.find({creator:userId}).populate({
        path: "lectures",
        select: "lectureTitle videoUrl isPreviewFree duration description", // select fields you need
      })
        if(!courses)
        {
            return res.status(404).json({message:"Course not found"})
        }
        return res.status(200).json({
            message:"Creator courses fetched successfully",
            courses
        })
        
    } catch (error) {
        return res.status(500).json({message:`Failed to get creator courses ${error}`})
    }
}

export const editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const {
      title, subTitle, description, category, level, price
    } = req.body;

    let thumbnail;
    if (req.file) {
      thumbnail = await uploadOnCloudinary(req.file.path);
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const updateData = {
      title,
      subTitle,
      description,
      category,
      level,
      price,
      thumbnail: thumbnail || course.thumbnail,

      // IMPORTANT → Instructor ने Save दबाया → course goes to pending
      status: "pending",
      rejectReason: ""   // remove old reason
    };

    const updated = await Course.findByIdAndUpdate(courseId, updateData, { new: true });

    return res.status(200).json(updated);

  } catch (error) {
    return res.status(500).json({ message: `Failed to update course ${error}` })
  }
};



export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    let course = await Course.findById(courseId)
      .populate("lectures")
      .populate("creator", "name email photoUrl description email");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: `Failed to get course ${error}` });
  }
};

export const removeCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await course.deleteOne();
    return res.status(200).json({ message: "Course Removed Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({message:`Failed to remove course ${error}`})
  }
};

 

// create lecture

export const createLecture = async (req,res) => {
    try {
        const {lectureTitle}= req.body
        const {courseId} = req.params

        if(!lectureTitle || !courseId){
             return res.status(400).json({message:"Lecture Title required"})
        }
        const lecture = await Lecture.create({lectureTitle})
        const course = await Course.findById(courseId)
        if(course){
            course.lectures.push(lecture._id)
            
        }
        await course.populate("lectures")
        await course.save()
        return res.status(201).json({lecture,course})
        
    } catch (error) {
        return res.status(500).json({message:`Failed to Create Lecture ${error}`})
    }
    
}

export const getCourseLecture = async (req,res) => {
    try {
        const {courseId} = req.params
        const course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({message:"Course not found"})
        }
        await course.populate("lectures")
        await course.save()
        return res.status(200).json(course)
    } catch (error) {
        return res.status(500).json({message:`Failed to get Lectures ${error}`})
    }
}

export const editLecture = async (req,res) => {
    try {
        const {lectureId} = req.params
        const {isPreviewFree , lectureTitle} = req.body
        const lecture = await Lecture.findById(lectureId)
          if(!lecture){
            return res.status(404).json({message:"Lecture not found"})
        }
        let videoUrl
        if(req.file){
            videoUrl =await uploadOnCloudinary(req.file.path)
            lecture.videoUrl = videoUrl
                }
        if(lectureTitle){
            lecture.lectureTitle = lectureTitle
        }
        lecture.isPreviewFree = isPreviewFree
        
         await lecture.save()
        return res.status(200).json(lecture)
    } catch (error) {
        return res.status(500).json({message:`Failed to edit Lectures ${error}`})
    }
    
}

export const removeLecture = async (req,res) => {
    try {
        const {lectureId} = req.params
        const lecture = await Lecture.findByIdAndDelete(lectureId)
        if(!lecture){
             return res.status(404).json({message:"Lecture not found"})
        }
        //remove the lecture from associated course

        await Course.updateOne(
            {lectures: lectureId},
            {$pull:{lectures: lectureId}}
        )
        return res.status(200).json({message:"Lecture Remove Successfully"})
        }
    
     catch (error) {
        return res.status(500).json({message:`Failed to remove Lectures ${error}`})
    }
}


// // ✅ Upload Lecture PDF
// export const uploadCoursePdf = async (req, res) => {
//   try {
//     const { courseId } = req.params;

//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     if (!req.file) {
//       return res.status(400).json({ message: "No PDF file uploaded" });
//     }

//     // Save file path (from multer)
//     course.pdf = req.file.path;
//     await course.save();

//     res.status(200).json({
//       success: true,
//       message: "PDF uploaded successfully",
//       pdfUrl: course.pdf,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };



//get Creator data


// controllers/userController.js

export const getCreatorById = async (req, res) => {
  try {
    const {userId} = req.body;

    const user = await User.findById(userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json( user );
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "get Creator error" });
  }
};



// admin 
/* ---------- Admin Approve/Reject ---------- */
// approve course


// export const approveCourse = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const course = await Course.findByIdAndUpdate(id, {
//       status: "approved",
//       isPublished: true,
//       rejectReason: ""
//     }, { new: true });

//     if (!course) return res.status(404).json({ message: "Course not found" });
//     return res.status(200).json(course);
//   } catch (err) {
//     console.error("approveCourse:", err);
//     return res.status(500).json({ message: "Error approving course" });
//   }
// };

// // reject course
// export const rejectCourse = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { reason } = req.body;
//     if (!reason) return res.status(400).json({ message: "Reject reason required" });

//     const course = await Course.findByIdAndUpdate(id, {
//       status: "rejected",
//       isPublished: false,
//       rejectReason: reason
//     }, { new: true });

//     if (!course) return res.status(404).json({ message: "Course not found" });
//     return res.status(200).json(course);
//   } catch (err) {
//     console.error("rejectCourse:", err);
//     return res.status(500).json({ message: "Error rejecting course" });
//   }
// };

// /* ---------- Admin: list pending courses ---------- */
// export const getPendingCourses = async (req, res) => {
//   try {
//     const pending = await Course.find({ status: "pending" }).populate("creator", "name email");
//     return res.status(200).json(pending);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Error fetching pending courses" });
//   }
// };

// ADMIN → Approve course
export const approveCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndUpdate(
      id,
      {
        status: "approved",
        isPublished: true,
        rejectReason: "",
      },
      { new: true }
    ).populate("creator", "name email photoUrl");

    if (!course) return res.status(404).json({ message: "Course not found" });

    return res.status(200).json(course);
  } catch (err) {
    console.error("approveCourse:", err);
    return res.status(500).json({ message: "Error approving course" });
  }
};

// ADMIN → Reject course
export const rejectCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    if (!reason) return res.status(400).json({ message: "Reject reason required" });

    const course = await Course.findByIdAndUpdate(
      id,
      {
        status: "rejected",
        isPublished: false,
        rejectReason: reason,
      },
      { new: true }
    ).populate("creator", "name email photoUrl");

    if (!course) return res.status(404).json({ message: "Course not found" });

    return res.status(200).json(course);
  } catch (err) {
    console.error("rejectCourse:", err);
    return res.status(500).json({ message: "Error rejecting course" });
  }
};

// ADMIN → get pending courses
export const getPendingCourses = async (req, res) => {
  try {
    const pending = await Course.find({ status: "pending" })
      .populate("creator", "name email photoUrl")
      .sort({ createdAt: -1 });

    return res.status(200).json(pending);
  } catch (err) {
    console.error("getPendingCourses:", err);
    return res.status(500).json({ message: "Error fetching pending courses" });
  }
};

// ADMIN → get approved courses
export const getApprovedCourses = async (req, res) => {
  try {
    const approved = await Course.find({ status: "approved" })
      .populate("creator", "name email photoUrl")
      .sort({ updatedAt: -1 });

    return res.status(200).json(approved);
  } catch (err) {
    console.error("getApprovedCourses:", err);
    return res.status(500).json({ message: "Error fetching approved courses" });
  }
};

// ADMIN → get rejected courses
export const getRejectedCourses = async (req, res) => {
  try {
    const rejected = await Course.find({ status: "rejected" })
      .populate("creator", "name email photoUrl")
      .sort({ updatedAt: -1 });

    return res.status(200).json(rejected);
  } catch (err) {
    console.error("getRejectedCourses:", err);
    return res.status(500).json({ message: "Error fetching rejected courses" });
  }
};





