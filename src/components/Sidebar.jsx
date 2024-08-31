import React from 'react'
import logo from "../img/logo.png"
import { buttons } from '../config/constants'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toggleSidebar } from '../store/slices/pageActionSlice'
const Sidebar = () => {
    const {pathname} = useLocation()
    const dispatch = useDispatch()
    return (
        <div>
            <div className='flex items-center justify-center'>
                <img src={logo} alt="logo" />
            </div>
            <hr className='my-[18px] border-gray-700' />

            <div className='flex items-center justify-center flex-col gap-[15px] py-[10px]'>
                {buttons.map(item => (
                    <Link to={item.path} key={item.id} className='w-full'>
                        <button onClick={() => dispatch(toggleSidebar())} className={`flex items-center px-[20px] gap-[10px] border-[2px] border-gray-600 ${pathname === item.path ? "bg-indigo-600  border-none" : "bg-gray-900"} py-[12px] w-full rounded-md font-medium active:scale-95`}>
                            <span className='text-[22px]'>{item.icon()}</span>
                            <span>{item.title}</span>
                        </button>
                    </Link>

                ))}
            </div>
        </div>
    )
}

export default Sidebar