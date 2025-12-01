import React from 'react'
import axios from 'axios';
import { serverUrl } from '../App.jsx';
import { useDispatch , useSelector} from 'react-redux';
import { setCourseData } from '../redux/courseSlice.js';
import { useEffect } from 'react';

import { setLectureData } from '../redux/lectureSlice.js';
// import {setCourseData} from '../redux/courseSlice.js'


const getPublishedCourse = () => {
  const dispatch = useDispatch()
  // const {userData} = useSelector((state)=>state.user)
  const {lectureData} = useSelector((state)=> state.lecture)
  // const {courseData} = useSelector((state)=> state.course)
  

  useEffect(()=>{
    const getPublishedCourse = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/course/getpublishedcourses" , {withCredentials:true})
        // console.log(result.data)
        dispatch(setCourseData(result.data))
        // console.log("course Data", result.data)
      } catch (error) {
        console.log(error)
      }
    }
    getPublishedCourse()
  },[lectureData])

}

export default getPublishedCourse;


