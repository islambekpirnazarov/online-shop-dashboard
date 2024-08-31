import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { toggleModal } from "./pageActionSlice"
import { fetchProductData } from "./productSlice"

const initialState = {
    categories: [],
    isCategoryLoad: false,
    isCategoryError: null,
    selectId: ""
}

// GET RESPONSE CATEGORY
export const fetchCategoryData = createAsyncThunk(
    "category/fetchCategoryData",
    async (url) => {
        const res = await axios.get(url)
        return res.data
    }
)

// POST RESPONSE CATEGORY
export const createCategoryData = createAsyncThunk(
    "category/createCategoryData",
    async ({ categoryUrl, categoryData }, { dispatch }) => {
        const res = await axios.post(categoryUrl, categoryData)
        dispatch(fetchCategoryData(categoryUrl))
        return res.data
    }
)

// DELETE RESPONSE CATEGORY
export const deleteCategoryData = createAsyncThunk(
    "category/deleteCategoryData",
    async ({ categoryUrl, id, products }, { dispatch }) => {
        const res = await axios.delete(`${categoryUrl}/${id}`)
        dispatch(fetchCategoryData(categoryUrl))
        if (res.statusText = "OK") {
            const deleteItems = products.filter(item => item.categoryId == id)
            deleteItems.forEach(async (item) => {
                await axios.delete(`https://online-shop-db-i7by.onrender.com/products/${item.id}`)
                await dispatch(fetchProductData("https://online-shop-db-i7by.onrender.com/products"))
            });
        }
        return res.data
    }
)

// PUT RESPONSE CATEGORY
export const updateCategoryData = createAsyncThunk(
    "category/updateCategoryData",
    async ({ categoryUrl, id, updateData }, { dispatch }) => {
        const res = await axios.put(`${categoryUrl}/${id}`, updateData)
        dispatch(fetchCategoryData(categoryUrl))
        dispatch(toggleModal())

        return res.data
    }
)


const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setSelectId: (state, action) => {
            state.selectId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategoryData.pending, (state) => {
            state.isCategoryLoad = true
        }).addCase(fetchCategoryData.fulfilled, (state, action) => {
            state.isCategoryLoad = false,
                state.categories = action.payload
        }).addCase(fetchCategoryData.rejected, (state, action) => {
            state.isCategoryLoad = false,
                state.isCategoryError = action.error.message
        })
        builder.addCase(createCategoryData.pending, (state) => {
            state.isCategoryLoad = true
        }).addCase(createCategoryData.fulfilled, (state, action) => {
            state.isCategoryLoad = false,
                state.categories = action.payload
        }).addCase(createCategoryData.rejected, (state, action) => {
            state.isCategoryLoad = false,
                state.isCategoryError = action.error.message
        })
        builder.addCase(deleteCategoryData.pending, (state) => {
            state.isCategoryLoad = true
        }).addCase(deleteCategoryData.fulfilled, (state, action) => {
            state.isCategoryLoad = false

        }).addCase(deleteCategoryData.rejected, (state, action) => {
            state.isCategoryLoad = false,
                state.isCategoryError = action.error.message
        })
        builder.addCase(updateCategoryData.pending, (state) => {
            state.isCategoryLoad = true
        }).addCase(updateCategoryData.fulfilled, (state, action) => {
            state.isCategoryLoad = false

        }).addCase(updateCategoryData.rejected, (state, action) => {
            state.isCategoryLoad = false,
                state.isCategoryError = action.error.message
        })
    }

})

export const { setSelectId } = categorySlice.actions

export default categorySlice.reducer