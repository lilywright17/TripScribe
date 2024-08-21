import {createSlice} from "@reduxjs/toolkit";

const initialReduxValue = {name: ""};

const userReduxSlice = createSlice({
    name: "userRedux",
    initialState: {value: initialReduxValue},
    reducers:{
        loginRedux: (state, action) => {
            state.value = action.payload;
        },

        logoutRedux: (state) => {
            state.value = initialReduxValue;
        },
    }
});

export const {loginRedux, logoutRedux} = userReduxSlice.actions;
export default userReduxSlice.reducer;
