import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as userServices from "../../services/userServices";

export const getUserDetail = createAsyncThunk("user/getUserDetail", async (id) => {
    return userServices.getUserDetailService(id).then((res) =>
        res.user
    );
});
export const editUser = createAsyncThunk("user/editUser", async (data) => {
    return userServices.editUserService(data).then((res) =>
        res
    );
});


const postSlice = createSlice({
    name: 'user',
    initialState: {
        userDetail: {},
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //get userDetail
            .addCase(getUserDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserDetail.fulfilled, (state, action) => {
                state.userDetail = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getUserDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //edit user
            .addCase(editUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                let res = action.payload;
                if (res.errCode === 0) {
                    state.userDetail = res.user;
                }
            })
            .addCase(editUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export default postSlice;