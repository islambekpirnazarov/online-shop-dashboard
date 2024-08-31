import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { toggleModal } from "./pageActionSlice"

const initialState = {
    products: [],
    isProductLoad: false,
    isProductError: null,
    selectId: ""
}

// GET RESPONSE PRODUCTS
export const fetchProductData = createAsyncThunk(
    "product/fetchProductData",
    async (url) => {
        const res = await axios.get(url)
        return res.data
    }
)

// POST RESPONSE PRODUCTS
export const createProductData = createAsyncThunk(
    "product/createProductData",
    async ({ productUrl, productData }, { dispatch }) => {
        const res = await axios.post(productUrl, productData)
        dispatch(fetchProductData(productUrl))
        return res.data
    }
)

// DELETE RESPONSE PRODUCTS
export const deleteProductData = createAsyncThunk(
    "product/deleteProductData",
    async ({ productUrl, id }, { dispatch }) => {
        const res = await axios.delete(`${productUrl}/${id}`)
        dispatch(fetchProductData(productUrl))
        return res.data
    }
)

// PUT RESPONSE PRODUCTS
export const updateProductData = createAsyncThunk(
    "product/updateProductData",
    async ({ productUrl, id, updateData }, { dispatch }) => {
        const res = await axios.put(`${productUrl}/${id}`, updateData)
        dispatch(fetchProductData(productUrl))
        dispatch(toggleModal())
        return res.data
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setSelectId: (state, action) => {
            state.selectId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductData.pending, (state) => {
            state.isProductLoad = true
        }).addCase(fetchProductData.fulfilled, (state, action) => {
            state.isProductLoad = false,
                state.products = action.payload
        }).addCase(fetchProductData.rejected, (state, action) => {
            state.isProductLoad = false,
                state.isProductError = action.error
        })
        builder.addCase(createProductData.pending, (state) => {
            state.isProductLoad = true
        }).addCase(createProductData.fulfilled, (state, action) => {
            state.isProductLoad = false,
                state.products = action.payload
        }).addCase(createProductData.rejected, (state, action) => {
            state.isProductLoad = false,
                state.isProductError = action.error.message
        })
        builder.addCase(deleteProductData.pending, (state) => {
            state.isProductLoad = true
        }).addCase(deleteProductData.fulfilled, (state, action) => {
            state.isProductLoad = false

        }).addCase(deleteProductData.rejected, (state, action) => {
            state.isProductLoad = false,
                state.isProductError = action.error.message
        })
        builder.addCase(updateProductData.pending, (state) => {
            state.isProductLoad = true
        }).addCase(updateProductData.fulfilled, (state, action) => {
            state.isProductLoad = false

        }).addCase(updateProductData.rejected, (state, action) => {
            state.isProductLoad = false,
                state.isProductError = action.error.message
        })
    }
})

export const { setSelectId} = productSlice.actions

export default productSlice.reducer