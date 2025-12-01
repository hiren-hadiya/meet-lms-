// routes/courseRoutes.js
import express from "express";
import isAuth from "../middleware/isAuth.js";
import isAdmin from "../middleware/isAdmin.js";
import upload from "../middleware/multer.js";

import {
  createCourse,
  createLecture,
  editCourse,
  editLecture,
  getCourseById,
  getCourseLecture,
  getCreatorById,
  getCreatorCourses,
  getPublishedCourses,
  removeCourse,
  removeLecture,
  approveCourse,
  rejectCourse,
  getPendingCourses,
  getApprovedCourses,
  getRejectedCourses,
  searchCourses
} from "../controller/courseController.js";

const router = express.Router();

// Instructor / public routes
router.post("/create", isAuth, createCourse);
router.get("/getpublishedcourses", getPublishedCourses);
router.get("/getcreatorcourses", isAuth, getCreatorCourses);
router.post("/editcourse/:courseId", isAuth, upload.single("thumbnail"), editCourse);
router.get("/getcourse/:courseId", isAuth, getCourseById);
router.delete("/removecourse/:courseId", isAuth, removeCourse);

// lecture routes
router.post("/createlecture/:courseId", isAuth, createLecture);
router.get("/getcourselecture/:courseId", isAuth, getCourseLecture);
router.post("/editlecture/:lectureId", isAuth, upload.single("videoUrl"), editLecture);
router.delete("/removelecture/:lectureId", isAuth, removeLecture);
router.post("/getcreator", isAuth, getCreatorById);

// Admin-specific routes (approval)
// router.get("/admin/pending", isAuth ,getPendingCourses);
// router.post("/admin/approve/:id", isAuth, approveCourse);
// router.post("/admin/reject/:id", isAuth, rejectCourse);
// router.get("/admin/getcourse/:courseId", isAuth, getCourseById);

// Admin-specific routes (approval + lists)
router.get("/admin/pending", isAuth, getPendingCourses);
router.get("/admin/approved", isAuth, getApprovedCourses);
router.get("/admin/rejected", isAuth,  getRejectedCourses);

router.post("/admin/approve/:id", isAuth,  approveCourse);
router.post("/admin/reject/:id", isAuth,  rejectCourse);
router.get("/admin/getcourse/:courseId", isAuth, getCourseById);

router.get("/search", searchCourses)


export default router;
