import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:{
        loading:false,
        user:{},
        users:[],
        isUserDeleted:false,
        isUserUpdated:false
    },
    reducers:{
        usersRequest(state,action){
            return {
                ...state,
                loading:true
            }
        },
        usersSuccess(state,action){
            return{
                ...state,
                loading:false,
                users:action.payload.users
            }
        },
        usersFailure(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        userRequest(state,action){
            return {
                ...state,
                loading:true
            }
        },
        userSuccess(state,action){
            return{
                ...state,
                loading:false,
                user:action.payload.user
            }
        },
        userFailure(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        deleteUserRequest(state,action){
            return {
                ...state,
                loading:true
            }
        },
        deleteUserSuccess(state,action){
            return{
                ...state,
                loading:false,
                isUserDeleted:true
            }
        },
        deleteUserFailure(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        updateUserRequest(state,action){
            return {
                ...state,
                loading:true
            }
        },
        updateUserSuccess(state,action){
            return{
                ...state,
                loading:false,
                isUserUpdated:true
            }
        },
        updateUserFailure(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        clearUserDeleted(state,action){
            return{
                ...state,
                loading:false,
                isUserDeleted:false
            }
        }, 
        clearUserUpdated(state,action){
            return{
                ...state,
                loading:false,
                isUserUpdated:false
            }
        },        
        clearError(state,action){
            return{
                ...state,
                error:null
            }
        }
    }
})

const {actions,reducer} = userSlice;
export const {usersRequest,usersSuccess,usersFailure,
    userRequest,userSuccess,userFailure,
    deleteUserRequest,deleteUserSuccess,deleteUserFailure,
    updateUserRequest,updateUserSuccess,updateUserFailure,
    clearUserDeleted,clearUserUpdated,
    clearError} = actions;
export default reducer;