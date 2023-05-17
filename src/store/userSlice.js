import { createSlice } from "@reduxjs/toolkit"

const initialState = []
let storageItem = JSON.parse(localStorage.getItem("userdata")) ?? [];

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        add(state, action) {
            // state.push(action.payload)
            storageItem.push(action.payload);
            localStorage.setItem("userdata", JSON.stringify(storageItem))
        },
        remove(state, action) {
            console.log(action.payload)
            storageItem = storageItem.filter((ele, index) => index !== action.payload)
            localStorage.setItem("userdata", JSON.stringify(storageItem))
        }
    },
})

export const { add, remove } = userSlice.actions
export default userSlice.reducer