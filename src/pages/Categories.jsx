import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ModalAlert from '../components/ModalAlert'
import CreateCategory from './CreateCategory'
import { toggleModal } from '../store/slices/pageActionSlice'
import { deleteCategoryData } from '../store/slices/categorySlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import CategoryCard from '../components/pageComp/CategoryCard'

const Categories = () => {
  const { categories, selectId, isCategoryLoad } = useSelector(state => state.category)
  const {products} = useSelector(state => state.product)
  const { modalType, showModal } = useSelector(state => state.pageAction)
  const categoryUrl = "https://online-shop-db-i7by.onrender.com/categories"
  const dispatch = useDispatch()
   function deleteCategory(id) {
    dispatch(deleteCategoryData({ categoryUrl, id, products }))
    dispatch(toggleModal())
    toast.success('Category Deleted', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  }
  return (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[15px]'>
      {isCategoryLoad ?
        [1, 2, 3].map(item => (
          <div key={item} className='animate-pulse flex items-center justify-between bg-gray-900 p-[15px]'>
            <div className='flex items-center gap-[10px]'>
              <div className='w-[70px] h-[70px] bg-gray-800'></div>
              <div>
                <div className='w-[150px] h-[20px] bg-gray-800 mb-[5px]'></div>
                <div className='w-[150px] h-[20px] bg-gray-800'></div>
              </div>
            </div>
            <div className='flex items-center gap-[10px]'>
              <div className='bg-gray-800 w-[30px] h-[30px]'></div>
              <div className='bg-gray-800 w-[30px] h-[30px]'></div>
            </div>
          </div>
        ))
        : categories.map(item => (
          <CategoryCard key={item.id} item={item} />
        ))}

      {showModal &&
        <ModalAlert>
          {modalType == "update" ? <CreateCategory baseData={categories.find(item => item.id == selectId)} />
            :
            <div>
              <h3 className='text-[18px] font-semibold mt-[15px]'>Delete Category</h3>
              <p> Are you sure you want to delete it?.</p>

              <div className='flex items-center justify-end gap-[20px] mt-[20px]'>
                <button onClick={() => dispatch(toggleModal())} className='bg-indigo-500 py-[7px] px-[20px] rounded-md font-medium'>Cancel</button>
                <button onClick={() => deleteCategory(selectId)} className='bg-red-500 py-[7px] px-[20px] rounded-md font-medium'>Delete</button>
              </div>
            </div>}
        </ModalAlert>
      }
      <ToastContainer />
    </div>
  )
}

export default Categories