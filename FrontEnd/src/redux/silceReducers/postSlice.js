import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as postServices from "../../services/postServices";
import { toast } from 'react-toastify';


export const createPost = createAsyncThunk("admin/createPost", async (data) => {
    return postServices.createPostService(data).then((res) =>
        res
    );
});
export const getPosts = createAsyncThunk("post/getPosts", async () => {
    return postServices.getPostsService().then((res) =>
        res.data
    );
});


const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //get posts
            .addCase(getPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //create user
            .addCase(createPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                let res = action.payload;
                if (res && res.errCode !== 0) {
                    toast.error(res.message);
                    return;
                } else {
                    state.posts.unshift(action.payload.post);
                    state.loading = false;
                    state.error = null;
                    toast.success(res.message)
                }
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })


    }
})

export default postSlice;