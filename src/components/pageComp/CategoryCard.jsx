import { BsTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch} from "react-redux";
import { setModalType, toggleModal } from "../../store/slices/pageActionSlice";
import { setSelectId } from "../../store/slices/categorySlice";

const CategoryCard = ({ item }) => {
    const dispatch = useDispatch()
    function selectIdFunc(id, type) {
        dispatch(toggleModal())
        dispatch(setModalType(type))
        dispatch(setSelectId(id))
    }
    return (
        <div className='flex items-center justify-between bg-gray-900 p-[15px] rounded-md'>
            <div className="flex items-center gap-[10px]">
                <div className="bg-indigo-500 p-[5px] rounded-md flex items-center justify-center">
                    <img src={item.image} alt={item.title} className="w-[50px] h-[50px] object-contain" />
                </div>
                <div className="">{item.title}</div>
            </div>
            <div className="flex items-center justify-center gap-[10px]">
                <button onClick={() => selectIdFunc(item.id, "update")} className="bg-indigo-600 p-[10px] rounded-md active:scale-95"><AiFillEdit /></button>
                <button onClick={() => selectIdFunc(item.id, "delete")} className="bg-red-600 p-[10px] rounded-md active:scale-95"><BsTrashFill /></button>
            </div>
        </div>
    )
}

export default CategoryCard