import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:{
        loading:true,
        isAuthenticated:false
    },
    reducers:{
        loginRequest(state,action){
            return {
                ...state,
                loading:true
            }
        },
        loginSuccess(state,action){
            return{
                loading:false,
                isAuthenticated:true,
                user:action.payload.user
            }
        },
        loginFailure(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        clearError(state,action){
            return{
                ...state,
                error:null
            }
        },
        registerRequest(state,action){
            return {
                ...state,
                loading:true
            }
        },
        registerSuccess(state,action){
            return{
                loading:false,
                isAuthenticated:true,
                user:action.payload.user
            }
        },
        registerFailure(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        loadUserRequest(state,action){
            return {
                ...state,
                isAuthenticated:false,
                loading:true
            }
        },
        loadUserSuccess(state,action){
            return{
                loading:false,
                isAuthenticated:true,
                user:action.payload.user
            }
        },
        loadUserFailure(state,action){
            return{
                ...state,
                loading:false
            }
        },
        logoutSuccess(state,action){
            return{
                loading:false,
                isAuthenticated:false
            }
        },
        logoutFailure(state,action){
            return{
                ...state,
                error:action.payload
            }
        },
        updateProfileRequest(state,action){
            return {
                ...state,
                loading:true,
                isUpdated:false
            }
        },
        updateProfileSuccess(state,action){
            return{
                ...state,
                loading:false,
                isUpdated:true,
                user:action.payload.user
            }
        },
        updateProfileFailure(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        clearUpdateProfile(state,action){
            return{
                ...state,
                isUpdated:false
            }
        },
        updatePasswordRequest(state,action){
            return {
                ...state,
                loading:true,
                isUpdated:false
            }
        },
        updatePasswordSuccess(state,action){
            return{
                ...state,
                loading:false,
                isUpdated:true
            }
        },
        updatePasswordFailure(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        forgotPasswordRequest(state,action){
            return {
                ...state,
                loading:true,
                message:null
            }
        },
        forgotPasswordSuccess(state,action){
            return{
                ...state,
                loading:false,
                message:action.payload.message
            }
        },
        forgotPasswordFailure(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        resetPasswordRequest(state,action){
            return {
                ...state,
                loading:true
            }
        },
        resetPasswordSuccess(state,action){
            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                user:action.payload.user
            }
        },
        resetPasswordFailure(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        }
    }
})

const {actions,reducer} = authSlice;
export const {loginRequest,
    loginSuccess,
    loginFailure,
    clearError,
    registerRequest,
    registerSuccess,
    registerFailure,
    loadUserRequest,
    loadUserSuccess,
    loadUserFailure,
    logoutSuccess,
    logoutFailure,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFailure,
    clearUpdateProfile,
    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFailure,
forgotPasswordRequest,forgotPasswordSuccess,forgotPasswordFailure,
resetPasswordRequest,resetPasswordSuccess,resetPasswordFailure} = actions;
export default reducer;