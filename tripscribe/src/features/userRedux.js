import {createSlice} from "@reduxjs/toolkit";

const userReduxSlice = createSlice({
    name: "userRedux",
    initialState: {value: {name: ""}},
    reducers:{
        loginRedux: (state, action) => {
            state.value = action.payload;
        },
    }
});

export const {loginRedux} = userReduxSlice.actions;

export default userReduxSlice.reducer;
