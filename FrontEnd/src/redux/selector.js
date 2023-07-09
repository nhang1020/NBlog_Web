import { createSelector } from "@reduxjs/toolkit";

export const allCodesSelector = (state) => state.admin.allCodes;
export const userSelector = (state) => state.admin.users;
export const isLogIn = (state) => state.app.isLogIn;
export const userInfo = (state) => state.app.user;

export const allCodeRemainingSelector = createSelector(
    allCodesSelector,
    (allCodes) => {
        return allCodes
    })

export const usersRemainingSelector = createSelector(
    userSelector,
    (users) => {
        return users
    })

export const isLogInSelector = createSelector(
    isLogIn,
    (isLogIn) => {
        return isLogIn
    })

export const userInfoSelector = createSelector(
    userInfo,
    (userInfo) => {
        return userInfo
    })