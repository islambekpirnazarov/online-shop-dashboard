import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./slices/categorySlice";
import productSlice from "./slices/productSlice";
import pageActionSlice from "./slices/pageActionSlice";

export const store = configureStore({
    reducer : {
        category : categorySlice,
        product : productSlice,
        pageAction : pageActionSlice
    }
})