import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Content from '../components/Content'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategoryData } from '../store/slices/categorySlice'
import { fetchProductData } from '../store/slices/productSlice'
import { SlArrowRight } from 'react-icons/sl'
import { toggleSidebar } from '../store/slices/pageActionSlice'

const MainLayout = () => {
    const dispatch = useDispatch()
    const {showSidebar} = useSelector(state => state.pageAction)
    const categoryUrl = "https://online-shop-db-i7by.onrender.com/categories"
    const productUrl = "https://online-shop-db-i7by.onrender.com/products"
    useEffect(() => {
        dispatch(fetchCategoryData(categoryUrl))
        dispatch(fetchProductData(productUrl))
    }, [])
  return (
    <div className='font-mont flex p-[10px] bg-gray-700 text-white h-[100vh] gap-[10px]'>
        <div className={`z-[20] duration-300 min-w-[280px] bg-gray-800 ${showSidebar ? 'left-[-10px]' : 'left-[-280px]'} top-[10px] bottom-[10px] absolute sm:static rounded-md p-[20px]`}>
                <Sidebar />
                <button onClick={() => dispatch(toggleSidebar())} className="w-[30px] h-[40px] bg-gray-900 rounded-md text-[20px] flex sm:hidden items-center justify-center text-white absolute right-[-32px] active:scale-95">
                    <div className={`${!showSidebar ? 'rotate-0' : 'rotate-180'} duration-300`}>
                        <SlArrowRight />
                    </div>
                </button>
            </div>
        <div className='w-full'>
            <div className='bg-gray-800 flex items-center px-[15px] rounded-md h-[70px]'>
                <Header/>
            </div>
            <div className='bg-gray-800 p-[15px] my-[10px] rounded-md min-h-[calc(100vh-100px)] max-h-[calc(100vh-100px)] overflow-y-auto'>
                <Content>
                    <Outlet/>
                </Content>
            </div>
        </div>
    </div>
  )
}

export default MainLayout