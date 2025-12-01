// import React, { useState } from 'react'
// import logo from '../assets/logo1.jpg'
// import google from '../assets/google.jpg'
// import { IoEye } from "react-icons/io5";
// import { FaEyeSlash } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { serverUrl } from '../App';
// import { toast } from 'react-toastify';
// import {ClipLoader} from 'react-spinners'
// import { useDispatch } from 'react-redux';
// import  {setUserData}  from '../redux/userSlice'
// import { signInWithPopup } from 'firebase/auth';
// import { auth, provider } from '../utils/firebase';

// function SignUp() {
//     const [show,setShow] = useState(true);
//     const navigate = useNavigate();

//     const[name,setName] = useState("");
//     const[email,setEmail] = useState("");
//     const[password,setPassword] = useState("");
//     const[role,setRole] = useState("student");

//     const[loading,setLoading] = useState(false);

//     const dispatch = useDispatch();

//     const handleSignup = async () => {
//         setLoading(true);
//         try {
//             const result = await axios.post(serverUrl + "/api/auth/signup", { name, email, password, role }, { withCredentials: true });
//             dispatch(setUserData(result.data));
//             setLoading(false);
//             navigate("/");
//             toast.success("Signup Successfully");
//         } catch (error) {
//             console.log(error)
//             setLoading(false);
//             toast.error(error.response.data.message);
//         }
//     }

//     const goggleSignup = async () => {
//         try {
//             const res = await signInWithPopup(auth, provider);
//             let user = res.user;
//             let name = user.displayName;
//             let email = user.email;
//             // console.log(res)
//             const result = await axios.post(serverUrl + "/api/auth/googgleauth", { name, email, role }, { withCredentials: true });
//             dispatch(setUserData(result.data));
//             navigate("/");
//             toast.success("Login Successfully");
//         } catch (error) {
//             console.log(error)
//             toast.error(error.response?.data?.message);
//         }
//     }

//   return (
//     <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex justify-center items-center'>
//         <form onSubmit={(e)=> e.preventDefault()} className='w-[90%] md:w-200 h-150 bg-white shadow-xl rounded-2xl flex'>
//            {/* left div  */}
//             <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col justify-center items-center gap-3'>
//                 <div>
//                     <h1 className='font-semibold text-2xl '>Let's Started</h1>
//                     <h2 className='text-[#999797] text-[18px]'>Create Your Account</h2>
//                 </div>

//                 <div className='flex flex-col gap-1 w-[80%] item-start justify-center px-3'>
//                     <label htmlFor="name" className='font-semibold' >Name</label>
//                     <input type="text" id='name' className='border-1 w-[100%] h-[35px] border-[#e7e6e6] tex-[15px] px-[20px]' placeholder='Your Name' onChange={(e)=> setName(e.target.value)}  value={name}/>
//                 </div>

//                  <div className='flex flex-col gap-1 w-[80%] item-start justify-center px-3'>
//                     <label htmlFor="email" className='font-semibold' >Email</label>
//                     <input type="email" id='email' className='border-1 w-[100%] h-[35px] border-[#e7e6e6] tex-[15px] px-[20px]' placeholder='Your Email'  onChange={(e)=> setEmail(e.target.value)}  value={email} />
//                 </div>

//                  <div className='flex flex-col gap-1 w-[80%] item-start justify-center px-3 relative'>
//                     <label htmlFor="password" className='font-semibold' >Password</label>
//                     <input type={show ? "text" : "password"} id='password' className='border-1 w-[100%] h-[35px] border-[#e7e6e6] tex-[15px] px-[20px]' placeholder='Your Password'  onChange={(e)=> setPassword(e.target.value)}  value={password} />
//                     {show ? <IoEye  className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]' onClick={()=> setShow(prev => !prev)}/> :
//                     <FaEyeSlash className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]' onClick={()=> setShow(prev => !prev)} />}
//                 </div>

//                 <div className='flex md:w-[50%]  w-[70%]  items-center justify-between'>
//                     <span className={`px-[10px]  py-[5px] border-[2px] border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black ${role === "student" ? "border-black" : "border-[#646464]"}`} onClick={()=> setRole("student")}>Student</span>
//                     <span className={`px-[10px]  py-[5px] border-[2px] border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black ${role === "instructor" ? "border-black" : "border-[#646464]"}`} onClick={()=> setRole("instructor")}>Instructor</span>
//                 </div>

//                 <button className='w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]' onClick={handleSignup} disabled={loading}>{loading ? <ClipLoader size={30} color='white'/> : "Singup" }</button>

//                 <div className='w-[80%] flex items-center gap-2'>
//                     <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
//                     <div className='w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center'>Or Continue</div>
//                     <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
//                 </div>

//                 <div className='w-[80%] h-[40px] border-1 border-[black] rounded-[5px] flex items-center justify-center cursor-pointer' onClick={goggleSignup}>
//                     <img src={google} className='w-[25px]' alt="" />
//                     <span className='text-[18px] text-gray-500'>oogle</span>
//                 </div>

//                 <div className='text-[#6f6f6f] '>Already have an account ? <span onClick={()=> navigate("/login")} className='underline underline-offset-1 text-black cursor-pointer'>Login</span>
//                 </div>
//             </div>
//             {/* rigth div  */}
//             <div className='w-[50%] h-[100%] rounded-r-2xl bg-[#000000]  md:flex items-center justify-center  flex-col hidden'>
//                 <img src={logo} alt="logo" className='w-90 shadow-2xl '/>
//                 <span className='text-2xl text-white'>Learning Management System </span>
//             </div>
//         </form>
//     </div>
//   )
// }

// export default SignUp



import React, { useState } from 'react'
import logo from '../assets/logo1.jpg'
import { IoEye } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners'
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice'

function SignUp() {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        mobile: "",
        gender: "",
        birthdate: "",
        address: "",
        role: "student"
    });

    const validateForm = () => {
        const { name, email, password, mobile, gender, birthdate, address } = formData;
        if (!name || !/^[A-Za-z ]+$/.test(name)) { toast.error("Enter a valid name"); return false; }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast.error("Enter valid email"); return false; }
        if (!mobile || !/^\d{10}$/.test(mobile)) { toast.error("Enter 10 digit mobile"); return false; }
        if (!gender) { toast.error("Select gender"); return false; }
        if (!birthdate) { toast.error("Select birthdate"); return false; }
        if (!address || address.length < 5) { toast.error("Address must be at least 5 characters"); return false; }
        if (!password || password.length < 8) { toast.error("Password must be 8+ chars"); return false; }
        return true;
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

    const handleSignup = async () => {
        if (!validateForm()) return;
        setLoading(true);
        try {
            const result = await axios.post(serverUrl + "/api/auth/signup", formData, { withCredentials: true });
            dispatch(setUserData(result.data));
            setLoading(false);
            navigate("/");
            toast.success("Signup Successfully");
        } catch (error) {
            setLoading(false);
            toast.error(error.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="bg-gradient-to-br from-[#E0EAFF] to-[#F7EFFF] w-screen h-screen flex justify-center items-center p-4 overflow-auto">
            <form
                onSubmit={(e) => e.preventDefault()}
                className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl flex flex-col md:flex-row overflow-hidden"
            >
                {/* Left Form */}
                <div className="md:w-1/2 w-full flex flex-col items-center py-8 overflow-y-auto max-h-[90vh] px-8">
                    <div className="text-center mb-6">
                        <h1 className="font-bold text-3xl text-[#1B1F3B]">Let's Get Started</h1>
                        <p className="text-gray-500 text-lg mt-1">Create Your Account</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        {/* Name */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name" className="font-semibold text-[#1B1F3B]">Name</label>
                            <input type="text" id="name" value={formData.name} onChange={handleChange}
                                placeholder="Your Name"
                                className="border border-[#C7B8FF] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6AA9FF] focus:border-transparent" />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="font-semibold text-[#1B1F3B]">Email</label>
                            <input type="email" id="email" value={formData.email} onChange={handleChange}
                                placeholder="Your Email"
                                className="border border-[#C7B8FF] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6AA9FF] focus:border-transparent" />
                        </div>

                        {/* Mobile */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="mobile" className="font-semibold text-[#1B1F3B]">Mobile</label>
                            <input type="text" id="mobile" value={formData.mobile} onChange={handleChange}
                                placeholder="10 Digit Mobile"
                                className="border border-[#C7B8FF] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6AA9FF] focus:border-transparent" />
                        </div>

                        {/* Birthdate */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="birthdate" className="font-semibold text-[#1B1F3B]">Birthdate</label>
                            <input type="date" id="birthdate" value={formData.birthdate} onChange={handleChange}
                                max={new Date().toISOString().split("T")[0]}
                                className="border border-[#C7B8FF] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6AA9FF] focus:border-transparent" />
                        </div>

                        {/* Gender (full row) */}
                        <div className="flex flex-col gap-1 md:col-span-2">
                            <label className="font-semibold text-[#1B1F3B]">Gender</label>
                            <div className="flex gap-4">
                                {["male", "female", "other"].map(g => (
                                    <label key={g}>
                                        <input type="radio" name="gender" value={g} checked={formData.gender === g}
                                            onChange={() => setFormData({ ...formData, gender: g })} /> {g}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Address */}
                        <div className="flex flex-col gap-1 md:col-span-2">
                            <label htmlFor="address" className="font-semibold text-[#1B1F3B]">Address</label>
                            <textarea id="address" rows="2" value={formData.address} onChange={handleChange}
                                placeholder="Your Address"
                                className="border border-[#C7B8FF] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6AA9FF] focus:border-transparent" />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1 relative md:col-span-2">
                            <label htmlFor="password" className="font-semibold text-[#1B1F3B]">Password</label>
                            <input type={show ? "text" : "password"} id="password" value={formData.password} onChange={handleChange}
                                placeholder="Your Password"
                                className="border border-[#C7B8FF] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6AA9FF] focus:border-transparent" />
                            {show ? <IoEye className="absolute right-3 top-9 cursor-pointer text-gray-500" onClick={() => setShow(prev => !prev)} />
                                : <FaEyeSlash className="absolute right-3 top-9 cursor-pointer text-gray-500" onClick={() => setShow(prev => !prev)} />}
                        </div>
                    </div>

                    {/* Role */}
                    <div className="flex gap-6 mt-4">
                        {["student","instructor"].map(r => (
                            <span key={r} className={`px-3 py-1 border-2 rounded-xl cursor-pointer ${formData.role===r?"border-[#6AA9FF] bg-gradient-to-r from-[#6AA9FF] to-[#7B61FF] text-white":"border-gray-400"}`}
                                onClick={()=>setFormData({...formData, role:r})}>{r.charAt(0).toUpperCase()+r.slice(1)}</span>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <button className="w-full py-3 mt-6 bg-gradient-to-r from-[#6AA9FF] to-[#7B61FF] text-white font-semibold rounded-lg hover:from-[#7B61FF] hover:to-[#6AA9FF] flex items-center justify-center cursor-pointer"
                        onClick={handleSignup} disabled={loading}>
                        {loading ? <ClipLoader size={25} color="white"/> : "Signup"}
                    </button>

                    <div className="text-gray-600 mt-4 text-center">Already have an account? <span onClick={()=>navigate("/login")} className="underline cursor-pointer text-[#6AA9FF] hover:text-[#7B61FF]">Login</span></div>
                </div>

               {/* Right Panel */}
<div className="md:w-1/2 hidden md:flex relative">
    <img src={logo} alt="Logo" className="absolute inset-0 w-full h-full object-cover"/>
    <div className="absolute inset-0 flex flex-col justify-start items-center bg-black/30 pt-10">
        <h2 className="text-3xl font-bold text-center px-4 bg-gradient-to-r from-[#6AA9FF] to-[#7B61FF] text-transparent bg-clip-text">
            Learning Management System
        </h2>
    </div>
</div>

            </form>
        </div>
    )
}

export default SignUp;
