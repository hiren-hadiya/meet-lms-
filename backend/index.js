import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/connectDb.js';
import cookieParser from 'cookie-parser';
import authRoute from './route/authRoute.js';
import cors from 'cors';
import userRouter from './route/userRoute.js';
import courseRouter from './route/courseRoute.js';
import reviewRouter from './route/reviewRoute.js';
import paymentRouter from './route/paymentRout.js';





dotenv.config();


const app = express();

const port = process.env.PORT 
app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use('/api/auth/', authRoute)
app.use('/api/user/', userRouter);
app.use('/api/course', courseRouter);
app.use('/api/review', reviewRouter)
app.use('/api/order',paymentRouter)

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// });

app.listen(port, () => {
  console.log(`server started : ${port}`)
  connectDb()
});
