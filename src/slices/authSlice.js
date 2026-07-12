import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    status : false,
    userData : null,
    userName : null
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        login : (state, action) => {
            state.status = true,
            state.userData = action.payload
        },
        logout : (state, action) => {
            state.status = false,
            state.userData = null;
        },
        setName : (state, action) => {
            state.userName = action.payload
        }
    }


})
export const {login , logout , setName} = authSlice.actions
export default authSlice.reducer