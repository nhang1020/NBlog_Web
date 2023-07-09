import { configureStore } from '@reduxjs/toolkit';
import adminSlice from './silceReducers/adminReducers';
import postSlice from './silceReducers/postSlice'
import appSlice from './silceReducers/appSlice'
const store = configureStore({
    reducer: {
        app: appSlice.reducer,
        admin: adminSlice.reducer,
        post: postSlice.reducer,

    },
    devTools: true,
});

export default store;