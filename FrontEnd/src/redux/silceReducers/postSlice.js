import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as postServices from "../../services/postServices";
import { toast } from 'react-toastify';


export const createPost = createAsyncThunk("post/createPost", async (data) => {
    return postServices.createPostService(data).then((res) =>
        res
    );
});
export const getPosts = createAsyncThunk("post/getPosts", async () => {
    return postServices.getPostsService().then((res) =>
        res
    );
});
export const deletePost = createAsyncThunk("post/deletePost", async (id) => {
    return postServices.deletePostService(id).then((res) =>
        res
    );
});

const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        loading: false,
        error: null,
        images: []
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
                state.posts = action.payload.data;
                state.images = action.payload.images;
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
                state.loading = false;
                state.error = null;
                state.images = action.payload.images;
                if (res && res.errCode !== 0) {
                    toast.error(res.message);
                    return;
                } else {
                    state.posts.unshift(action.payload.post);
                }
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //delete post
            .addCase(deletePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                let res = action.payload;
                state.loading = false;
                state.error = null;
                if (res && res.errCode === 1) {
                    toast.error(res.message);
                    return;
                } else {
                    state.posts = state.posts.filter(post => post.id !== res.id)
                    state.images = state.images.filter(image => image.postId !== res.id)
                }
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })


    }
})

export default postSlice;