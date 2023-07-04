import { configureStore } from '@reduxjs/toolkit';
import adminSlice from './silceReducers/adminReducers';
const store = configureStore({
    reducer: {
        admin: adminSlice,
    },
    devTools: true,
});

export default store;