import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    showSidebar : false,
    showModal : false,
    modalType : "update"
}

export const pageActionSlice = createSlice({
    name : 'page-action',
    initialState,
    reducers : {
        toggleSidebar : (state) => {
            state.showSidebar = state.showSidebar ? false : true
        },
        toggleModal : (state) => {
            state.showModal = state.showModal ? false : true
        },
        setModalType : (state, action) => {
            state.modalType = action.payload
        }
    }
})

export const {toggleSidebar, toggleModal, setModalType} = pageActionSlice.actions
export default pageActionSlice.reducer