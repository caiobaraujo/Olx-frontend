import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'user',
    initialState: { 
        email: 'caio@gmail.com'
    },
    reducers: {
       
        setEmail: (state, action)=> {
            state.email = action.payload;
        }
    }
})

export const {setEmail} = slice.actions;

export default slice.reducer;