import React from 'react'
import Nav from '../component/Nav'
import home from "/src/assets/home1.jpg"
// import { SiViaplay } from "react-icons/si";
import { MdFeaturedPlayList } from "react-icons/md";
import Logos from '../component/Logos';
import ExploreCourses from '../component/ExploreCourses';
import CardPage from '../component/CardPage';
import { useNavigate } from 'react-router-dom';
import About from '../component/About';
import Footer from '../component/Footer';
import ReviewPage from '../component/ReviewPage';

function Home() {
  const navigate = useNavigate();
  return (
    <div className='w-[100%] overflow-hidden'>
       <div className='w-[100%] lg:h-[140vh] h-[70vh] relative'>
          <Nav/>
          <img src={home} className='object-cover md:object-fill w-[100%] lg:h-[100%] h-[50vh]' alt="" />

         {/* Hero Text */}
  <div className='absolute w-full flex flex-col items-center justify-center top-[15%] lg:top-[10%] text-center px-4'>
    <span className='lg:text-[70px] md:text-[40px] text-[20px] text-white font-bold drop-shadow-lg'>
      Grow your skills to Advance
    </span>
    <span className='lg:text-[70px] md:text-[40px] text-[20px] text-white font-bold drop-shadow-lg mt-2'>
      Your Career Path
    </span>
  </div>
           <div className='absolute w-full flex items-center justify-center gap-4 flex-wrap top-[75%] md:top-[80%] lg:top-[30%] px-4'>
    <button 
      className='px-6 py-3  text-white rounded-lg text-lg font-medium bg-gradient-to-r  from-[#7B61FF] to-[#C7B8FF]  hover:from-[#7B61FF] hover:to-[#6AA9FF] transition flex items-center gap-2 cursor-pointer'
      onClick={() => navigate("/allcourses")}
    >
      View All Courses <MdFeaturedPlayList className="w-6 h-6 fill-white"/>
    </button>

    {/* <button 
      className='px-6 py-3 rounded-lg text-lg font-medium bg-gradient-to-r from-[#7B61FF] to-[#C7B8FF] hover:from-[#6AA9FF] hover:to-[#7B61FF] transition text-white flex items-center gap-2 cursor-pointer'
    >
      Search With AI
    </button> */}
  </div>
       </div>
        <Logos/>
        <ExploreCourses/>
        <CardPage/>
        <About/>
        <ReviewPage/>
        <Footer/>
    </div>
  )
}

export default Home