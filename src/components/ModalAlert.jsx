import { AiOutlineClose } from "react-icons/ai"; 
import React from 'react'
import { useDispatch } from "react-redux";
import { toggleModal } from "../store/slices/pageActionSlice";

const ModalAlert = ({children}) => {
    const dispatch = useDispatch()
    return (
        <div onClick={(e) => {
            if (e.target.classList.contains("overlay")) {
                dispatch(toggleModal())
            }
        }} className='z-[20] overlay fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-55 backdrop-blur-[3px] flex justify-center items-start p-[30px]'>
            <div className=' max-h-[calc(100vh-30px)] min-w-[400px] overflow-y-scroll p-[15px] rounded-md bg-gray-800'>
                <div onClick={() => dispatch(toggleModal())} className="text-white flex items-center justify-end text-[20px] cursor-pointer"><AiOutlineClose /></div>
                {children}
            </div>
        </div>
    )
}

export default ModalAlert