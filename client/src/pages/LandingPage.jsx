import React from 'react'
import DarkModeSwitcher from '../components/DarkModeSwitcher'
import { motion } from "framer-motion"
import {useNavigate} from "react-router-dom"
// icons
import { LuPartyPopper } from "react-icons/lu";

const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <div className='w-full flex-col  h-[100vh] dark:bg-black dark:text-white flex items-center justify-center' >
      <motion.h1
        className="text-[1.5rem] md:text-[3rem] lg:text-[4rem] font-semibold flex gap-4 items-center">
        React Screening Test
        <DarkModeSwitcher  />  {/* dark mode switcher */}
      </motion.h1>
      <button className='text-white px-4 py-2 rounded-md bg-purple-700 flex items-baseline justify-center gap-2' onClick={()=>navigate('/registration')}>Let go <LuPartyPopper/> </button>
    </div>
  )
}

export default LandingPage