import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';


function ForgetPassword() {
    const [step,setStep] = useState(1)
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [otp,setOtp] = useState("");
    const [newpassword,setNewPassword] = useState("");
    const [conPassword,setConPassword] = useState("");
    const [loading,setLoading] = useState(false);

    // for step = 1 
    const sendOtp = async () => {
        setLoading(true)
        try {
            const result = await axios.post(serverUrl + "/api/auth/sendotp", {email} , { withCredentials: true });
            console.log(result.data)
            setStep(2)
            toast.success(result.data.message);
            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message );
            setLoading(false) 
        }
    }

    // step 2
    const verifyOtp = async () => {
        setLoading(true)
        try {
             const result = await axios.post(serverUrl + "/api/auth/verifyotp", {email,otp} , { withCredentials: true });
            console.log(result.data)
            setStep(3)
            toast.success(result.data.message);
            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message );
            setLoading(false)
        }
    } 

    // step 3 
    const resetPassword = async () => {
        setLoading(true)
        try {
            if (newpassword !== conPassword){
                toast.error("Password and Confirm Password must be same");
                setLoading(false)
                return;
            }
            const result = await axios.post(serverUrl + "/api/auth/resetpassword", {email,password: newpassword} , { withCredentials: true });
            console.log(result.data)
            navigate("/login") 
            toast.success(result.data.message);
            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message );
            setLoading(false)
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
        {/* step 1  Enter email */}
        {
            step === 1 && <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>
                <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Forget Your Password</h2>
                <form onSubmit={(e)=> e.preventDefault()} className='space-y-4'>
                    <div>
                        <label htmlFor="" className='bloc text-sm font-medium text-gray-700'>Enter Your Email Address</label>
                        <input required type="text" id='email' className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black] 'placeholder='you@gmail.com' onChange={(e)=> setEmail(e.target.value)} value={email}/>
                    </div>
                    <button className='w-full bg-black hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer' disabled={loading} onClick={sendOtp}>{loading ? <ClipLoader size={30} color='white'/> : "Send Otp"}</button>
                </form>
                <div className='text-sm text-center mt-4 cursor-pointer' onClick={()=>navigate("/login")}>Back to Login</div>
            </div>
        }
        

        {/* step 2  Enter 4 digit otp */}
        {
            step === 2 && <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>
                <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Enter Otp</h2>
                <form onSubmit={(e)=> e.preventDefault()} className='space-y-4'>
                    <div>
                        <label htmlFor="otp" className='bloc text-sm font-medium text-gray-700'>Please Enter the 4-digit code sent to your email.</label>
                        <input required type="text" id='otp' className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black] 'placeholder='* * * *' onChange={(e)=> setOtp(e.target.value)} value={otp}/>
                    </div>
                    <button className='w-full bg-black hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer' disabled={loading} onClick={verifyOtp}>{loading ? <ClipLoader size={30} color='white'/> : "Verify Otp"}</button>
                </form>
                <div className='text-sm text-center mt-4 cursor-pointer' onClick={()=>navigate("/login")}>Back to Login</div>
            </div>
        }

        {/* step 3  confirm password */}
        {
            step === 3 && <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>
                <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Reset Your Password</h2>
                <p className='text-sm text-gray-500 text-center mt-6'>Enter a new password below to regain access to your account.</p>
                <form onSubmit={(e)=>e.preventDefault()} className='space-y-4'>
                    <div>
                        <label htmlFor="password" className='bloc text-sm font-medium text-gray-700'>New Password</label>
                        <input required type="text" id='password' className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black] 'placeholder='*********'
                        onChange={(e)=> setNewPassword(e.target.value)} value={newpassword}/>
                    </div>
                     <div>
                        <label htmlFor="conpassword" className='bloc text-sm font-medium text-gray-700'>Confirm Password</label>
                        <input required type="text" id='conpassword' className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black] 'placeholder='*********'
                        onChange={(e)=> setConPassword(e.target.value)} value={conPassword}/>
                    </div>
                    <button className='w-full bg-black hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer' disabled={loading} onClick={resetPassword}>{loading ? <ClipLoader size={30} color='white'/> :"Reset Password"}</button>
                </form>
                <div className='text-sm text-center mt-4 cursor-pointer' onClick={()=>navigate("/login")}>Back to Login</div>
            </div>
        }
    </div>
  )
}

export default ForgetPassword