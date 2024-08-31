import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModalType, toggleModal } from '../../store/slices/pageActionSlice'
import { setSelectId } from '../../store/slices/productSlice'

const ProductCard = ({ item }) => {
    const { categories } = useSelector(state => state.category)
    const selectCategory = categories.find(catItem => catItem.id == item.categoryId)
    const dispatch = useDispatch()
    function selectIdFunc(id, type) {
        dispatch(toggleModal())
        dispatch(setModalType(type))
        dispatch(setSelectId(id))
    }
    return (
        <div className='bg-gray-900 rounded-md p-[10px] flex flex-col gap-[10px]'>
            <div className='relative flex justify-center items-center h-[200px] w-full overflow-hidden cursor-pointer'>
                <img src={item.images[0]} className='w-[full] h-[full] rounded-md object-cover hover:scale-110 duration-200' />
                <span className='absolute top-[10px] left-[10px] text-[12px] py-[3px] px-[10px] rounded-sm text-nowrap bg-black bg-opacity-60 backdrop-blur-[1px] font-medium'>{selectCategory?.title}</span>
            </div>
            <div>
                <h1 className='text-[18px] font-semibold line-clamp-1'>{item.title}</h1>
                <h4>price : {item.price}$</h4>
                <p className='text-[14px] line-clamp-3'>{item.description}</p>
            </div>
            <div className='flex justify-center items-center gap-[5px]'>
                <button onClick={() => selectIdFunc(item.id, "update")} className='w-full bg-indigo-500 py-[4px] rounded-sm font-medium text-[15px] active:scale-95'>Update</button>
                <button onClick={() => selectIdFunc(item.id, "delete")} className='w-full bg-red-500 py-[4px] rounded-sm font-medium text-[15px] active:scale-95'>Delete</button>
            </div>
        </div>
    )
}

export default ProductCard