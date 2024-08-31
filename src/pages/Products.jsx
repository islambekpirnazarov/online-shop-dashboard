import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/pageComp/ProductCard'
import { toggleModal } from '../store/slices/pageActionSlice'
import { ToastContainer, toast } from 'react-toastify'
import ModalAlert from '../components/ModalAlert'
import CreateProduct from './CreateProduct'
import { deleteProductData } from '../store/slices/productSlice'


const Products = () => {
  const { products, isProductLoad, selectId } = useSelector(state => state.product)
  const { showModal, modalType } = useSelector(state => state.pageAction)
  const dispatch = useDispatch()
  const productUrl = "https://online-shop-db-i7by.onrender.com/products"

  function deleteProduct(id) {
    dispatch(deleteProductData({ productUrl, id }))
    dispatch(toggleModal())
    toast.success('Products Deleted', {
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
    <div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]  gap-[15px]'>
      {isProductLoad ?
        [1, 2, 3, 4].map(item => (
          <div key={item} className='bg-gray-900 rounded-md p-[10px] flex flex-col gap-[10px] animate-pulse'>
            <div className='flex justify-center items-center h-[200px] w-full overflow-hidden cursor-pointer'>
              <div className='w-[95%] h-[250px] bg-gray-800'></div>
            </div>
            <div className='flex flex-col justify-center items-center gap-[10px]'>
              <h1 className='w-[95%] bg-gray-800 h-[25px]'></h1>
              <h4 className='w-[95%] bg-gray-800 h-[20px]'></h4>
              <p className='w-[95%] bg-gray-800 h-[20px]'></p>
            </div>
            <div className='w-[95%] mx-auto flex justify-center items-center gap-[5px]'>
              <div className='bg-gray-800 w-full h-[20px]'></div>
              <div className='bg-gray-800 w-full h-[20px]'></div>
            </div>
          </div>
        ))
        : products.map(item => (
          <ProductCard item={item} key={item.id} />
        ))}
      {showModal &&
        <ModalAlert>
          {modalType == "update" ? <CreateProduct baseData={products.find(item => item.id == selectId)} />
            :
            <div>
              <h3 className='text-[18px] font-semibold mt-[15px]'>Delete Products</h3>
              <p> Are you sure you want to delete it?.</p>

              <div className='flex items-center justify-end gap-[20px] mt-[20px]'>
                <button onClick={() => dispatch(toggleModal())} className='bg-indigo-500 py-[7px] px-[20px] rounded-md font-medium'>Cancel</button>
                <button onClick={() => deleteProduct(selectId)} className='bg-red-500 py-[7px] px-[20px] rounded-md font-medium'>Delete</button>
              </div>
            </div>}
        </ModalAlert>
      }
      <ToastContainer />
    </div>
  )
}

export default Products