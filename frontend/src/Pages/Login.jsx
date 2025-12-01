import React, { useState } from 'react';
import logo from '../assets/logo1.jpg';
import { IoEye } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Login() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    setLoading(true)
    try {
      const result = await axios.post(serverUrl + "/api/auth/login", { email, password }, { withCredentials: true });
      dispatch(setUserData(result.data));
      setLoading(false);
      navigate("/");
      toast.success("Login Successfully");
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Login Failed");
    }
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-gradient-to-br from-[#6AA9FF]/20 to-[#C7B8FF]/20 p-4'>
      <form onSubmit={(e) => e.preventDefault()} className='w-full max-w-4xl h-auto bg-white shadow-2xl rounded-3xl flex flex-col md:flex-row overflow-hidden'>
        
        {/* Left Form */}
        <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 gap-4'>
          <div className='text-center'>
            <h1 className='font-bold text-3xl text-[#1B1F3B]'>Welcome Back</h1>
            <p className='text-gray-500 text-lg mt-1'>Login to your account</p>
          </div>

          <div className='w-full mt-4 flex flex-col gap-4'>
            <div className='flex flex-col'>
              <label htmlFor="email" className='font-semibold text-[#1B1F3B]'>Email</label>
              <input 
                type="email" 
                id='email' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Your Email'
                className='mt-1 px-4 py-2 border border-[#C7B8FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-gradient-to-r from-[#6AA9FF] to-[#7B61FF] text-[#1B1F3B]'
              />
            </div>

            <div className='flex flex-col relative'>
              <label htmlFor="password" className='font-semibold text-[#1B1F3B]'>Password</label>
              <input 
                type={show ? "text" : "password"} 
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Your Password'
                className='mt-1 px-4 py-2 border border-[#C7B8FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-gradient-to-r from-[#6AA9FF] to-[#7B61FF] text-[#1B1F3B]'
              />
              {show ? (
                <IoEye className='absolute right-3 bottom-3 w-5 h-5 cursor-pointer text-gray-500' onClick={() => setShow(prev => !prev)} />
              ) : (
                <FaEyeSlash className='absolute right-3 bottom-3 w-5 h-5 cursor-pointer text-gray-500' onClick={() => setShow(prev => !prev)} />
              )}
            </div>

            <button 
              type="submit"
              onClick={handleLogin}
              disabled={loading}
              className='w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-[#6AA9FF] to-[#7B61FF] hover:from-[#7B61FF] hover:to-[#6AA9FF] transition flex items-center justify-center gap-2 mt-2 cursor-pointer'
            >
              {loading ? <ClipLoader size={25} color="white"/> : "Login"}
            </button>

            <span className='text-sm text-gray-500 cursor-pointer hover:underline text-center mt-2' onClick={() => navigate("/forget")}>Forgot Your Password?</span>
          </div>

          <div className='text-gray-500 mt-6 text-center'>
            Create new account? <span onClick={() => navigate("/signup")} className='underline cursor-pointer text-[#6AA9FF] hover:text-[#7B61FF]'>Signup</span>
          </div>
        </div>

        {/* Right Image / Logo */}
        <div className='hidden md:flex w-1/2  bg-gradient-to-br from-[#6AA9FF] to-[#7B61FF] flex-col justify-center items-center p-8'>
          <img src={logo} alt="Logo" className='w-full h-auto mb-4 rounded-lg shadow-xl'/>
          <h2 className='text-white text-2xl font-semibold text-center'>Learning Management System</h2>
        </div>
      </form>
    </div>
  );
}

export default Login;
