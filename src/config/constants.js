import { BsFillCartPlusFill } from "react-icons/bs"; 
import { BiListPlus } from "react-icons/bi"; 
import { BiBasket } from "react-icons/bi"; 
import { BiCategoryAlt } from "react-icons/bi"; 
export const buttons = [
    {id : 1, title : "Categories", path : "/", icon : BiCategoryAlt},
    {id : 2, title : "Products", path : "/products", icon : BiBasket},
    {id : 3, title : "Create Category", path : "/create-category", icon : BiListPlus},
    {id : 4, title : "Create Product", path : "/create-product", icon : BsFillCartPlusFill}
]