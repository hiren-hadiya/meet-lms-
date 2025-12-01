import express from 'express';
import isAuth  from '../middleware/isAuth.js';
import { getCurentUser, updateProfile } from '../controller/userController.js';
import upload from '../middleware/multer.js';

const userRouter = express.Router();

userRouter.get("/getcurrentuser", isAuth,  getCurentUser);
userRouter.post("/profile", isAuth, upload.single("photoUrl"), updateProfile);

export default userRouter;