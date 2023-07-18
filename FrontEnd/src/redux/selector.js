import { createSelector } from "@reduxjs/toolkit";

export const allCodesSelector = (state) => state.admin.allCodes;
export const userSelector = (state) => state.admin.users;
export const isLogIn = (state) => state.app.isLogIn;
export const userInfo = (state) => state.app.user;
export const postSelector = (state) => state.post.posts;
export const postImagesSelector = (state) => state.post.images;
export const userDetail = (state) => state.user.userDetail;

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

export const postsRemainingSelector = createSelector(
    postSelector,
    (posts) => {
        return posts
    })
export const postImagesRemainingSelector = createSelector(
    postImagesSelector,
    (images) => {
        return images
    })

export const userDetailRemainingSelector = createSelector(
    userDetail,
    (user) => {
        return user
    })