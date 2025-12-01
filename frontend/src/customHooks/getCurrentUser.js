import axios from 'axios';
import React, { useEffect } from 'react'
import { serverUrl } from '../App.jsx';
import { useDispatch } from 'react-redux';
import  {setUserData}  from '../redux/userSlice.js'

const  getCurrentUser = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUser = async () => {
            try {
        const result = await axios.get(serverUrl + "/api/user/getcurrentuser" , {withCredentials:true})

                dispatch(setUserData(result.data));
                // console.log("get", result)
            } catch (error) {
                console.log(error)
                dispatch(setUserData(null));
            }
        }
        fetchUser();
    },[])
}

export default getCurrentUser