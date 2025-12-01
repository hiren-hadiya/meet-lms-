import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import { ToastContainer } from 'react-toastify';
import getCurrentUser from './customHooks/getCurrentUser'
import { useSelector } from 'react-redux'
import Profile from './Pages/Profile'
import ForgetPassword from './Pages/ForgetPassword'
import NotFound from './Pages/NotFound'
import EditProfile from './Pages/EditProfile'
import Dashboard from './Pages/Instructor/Dashboard'
import Courses from './Pages/Instructor/Courses'
import CreateCourses from './Pages/Instructor/CreateCourses'
import getCreatorCourse from './customHooks/getCreatorCourse'
import EditCourse from './Pages/Instructor/EditCourse'
import getPublishedCourse from './customHooks/getPublishedCourse'
import AllCourses from './Pages/AllCourses'
import CreateLecture from './Pages/Instructor/CreateLecture'
import EditLecture from './Pages/Instructor/EditeLecture'
import ViewCourse from './Pages/ViewCourse'
import ScrollToTop from './component/ScrollToTop'
import getAllReviews from './customHooks/getAllReviews'
import ViewLectures from './Pages/ViewLecture'
import MyEnrooledCourses from './Pages/MyEnrolledCourses'
import AdminDashboard from './Pages/admin/AdminDashboard'
import ManageCourses from './Pages/admin/ManageCourses'
import AdminViewCourse from './Pages/admin/AdminViewCourse'
import SearchResults from './Pages/SearchResults'


export const serverUrl = "http://localhost:3000"

function App() {
  getCurrentUser();
  getCreatorCourse();
  getPublishedCourse();
  getAllReviews();
  ScrollToTop()
  const { userData } = useSelector(state => state.user)
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={userData ? <Home /> : <Navigate to={"/login"} />} />

        <Route path='/login' element={!userData ? <Login /> : <Navigate to={"/"} />} />

        <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to={"/"} />} />

        <Route path='/profile' element={userData ? <Profile /> : <Navigate to={"/login"} />} />

        <Route path='/forget' element={!userData ? <ForgetPassword /> : <Navigate to={"/"} />} />

        <Route path='/editprofile' element={userData ? <EditProfile /> : <Navigate to={"/login"} />} />

        <Route path='/allcourses' element={userData ? <AllCourses /> : <Navigate to={"/login"} />} />

        <Route path='/dashboard' element={userData?.user.role === "instructor" ? <Dashboard /> : <Navigate to={"/login"} />} />

        <Route path='/courses' element={userData?.user.role === "instructor" ? <Courses /> : <Navigate to={"/login"} />} />

        <Route path='/createcourse' element={userData?.user.role === "instructor" ? <CreateCourses /> : <Navigate to={"/login"} />} />

        <Route path='/editcourse/:courseId' element={userData?.user.role === "instructor" ? <EditCourse /> : <Navigate to={"/login"} />} />

        <Route path='/createlecture/:courseId' element={userData?.user.role === "instructor" ? <CreateLecture /> : <Navigate to={"/login"} />} />

        <Route path='/editlecture/:courseId/:lectureId' element={userData?.user.role === "instructor" ? <EditLecture /> : <Navigate to={"/login"} />} />

        <Route path='/viewcourse/:courseId/' element={userData?.user ? <ViewCourse /> : <Navigate to={"/login"} />} />

        <Route path='/viewlecture/:courseId/' element={userData?.user ? <ViewLectures /> : <Navigate to={"/login"} />} />

        <Route path='/mycourses' element={userData?.user ? <MyEnrooledCourses /> : <Navigate to={"/login"} />} />

        <Route path='/admindashboard' element={userData?.user.role === "admin" ? <AdminDashboard /> : <Navigate to={"/login"} />} />

        {/* <Route 
  path="/admindashboard" 
  element={userData?.user.role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />} 
/> */}

        <Route
          path="/admin/manage-courses"
          element={userData?.user.role === "admin" ? <ManageCourses /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin/getcourse/:id"
          element={userData?.user.role === "admin" ? <AdminViewCourse /> : <Navigate to="/login" />}
        />
        <Route
          path="/search"
          element={<SearchResults />}
        />



        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App