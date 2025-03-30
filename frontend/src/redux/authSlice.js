import {createSlice} from '@reduxjs/toolkit';

// const storedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading:false,
        User:null,
    },
    reducers:{
        setloading:(state,action)=>{
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.User = action.payload;
        }
    } 
});
export const {setloading, setUser} = authSlice.actions;
export default authSlice.reducer;