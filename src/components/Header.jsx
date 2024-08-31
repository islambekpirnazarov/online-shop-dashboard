import { CiSearch } from "react-icons/ci"; 
import React from 'react'
import { useLocation } from 'react-router-dom'
import { buttons } from '../config/constants'

const Header = () => {
    const {pathname} = useLocation()
    const selectButton = buttons.find(item => item.path === pathname)
  return (
    <div className='flex justify-between items-center w-full gap-[20px]'>
        <div className='flex items-center gap-[10px]'>
            <span className='text-[24px] text-indigo-500'>{selectButton.icon()}</span>
            <span className='text-nowrap text-[18px] font-semibold'>{selectButton.title}</span>
        </div>

        <div className='relative w-[70%]'>
            <input placeholder='Search...' type="text" className='w-full px-[20px] py-[10px] outline-none focus:border-indigo-500 border-[2px] border-gray-700 rounded-[25px] bg-gray-700'/>
            <span className="text-[20px] absolute top-[50%] right-[15px] translate-y-[-50%]"><CiSearch /></span>
        </div>
    </div>
  )
}

export default Header