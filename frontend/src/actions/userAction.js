import axios from "axios";
import { loginFailure, loginRequest, loginSuccess, clearError, registerRequest,registerSuccess,registerFailure,loadUserRequest,loadUserSuccess,loadUserFailure, logoutFailure,logoutSuccess, updateProfileRequest, updateProfileSuccess, updateProfileFailure,updatePasswordRequest,updatePasswordSuccess,updatePasswordFailure, resetPasswordRequest, resetPasswordSuccess, resetPasswordFailure, forgotPasswordRequest, forgotPasswordSuccess, forgotPasswordFailure } from "../slices/authSlice"
import { deleteUserFailure, deleteUserRequest, deleteUserSuccess, updateUserFailure, updateUserRequest, updateUserSuccess, userFailure, userRequest, usersFailure, usersRequest, usersSuccess, userSuccess } from "../slices/userSlice";

export const login = (email,password )=> async(dispatch) => {
    try {
        dispatch(loginRequest());
        const {data} = await axios.post('/api/v1/login',{email,password})
        dispatch(loginSuccess(data))
        
    } catch (error) {
        dispatch(loginFailure(error.response.data.message))        
    }
} 
export const clearAuthError = dispatch =>{
    dispatch(clearError())
}

export const register = (userdata )=> async(dispatch) => {
    try {
        dispatch(registerRequest());
        const config = {
            header:{
                'Content-type':'multipart/form-data'
            }
        }
        const {data} = await axios.post('/api/v1/register',userdata,config)
        dispatch(registerSuccess(data))
        
    } catch (error) {
        dispatch(registerFailure(error.response.data.message))        
    }
} 

export const loadUser =  async(dispatch) => {
    try {
        dispatch(loadUserRequest());
       
        const {data} = await axios.get('/api/v1/myprofile')
        dispatch(loadUserSuccess(data))
        
    } catch (error) {
        dispatch(loadUserFailure(error.response.data.message))        
    }
} 

export const logout =  async(dispatch) => {
    try {
       
        await axios.get('/api/v1/logout')
        dispatch(logoutSuccess())
        
    } catch (error) {
        dispatch(logoutFailure(error.response.data.message))        
    }
} 

export const updateProfile = (userdata )=> async(dispatch) => {
    try {
        dispatch(updateProfileRequest());
        const config = {
            headers:{
                'Content-type':'multipart/form-data'
            }
        }
        const {data} = await axios.put('/api/v1/update',userdata,config)
        dispatch(updateProfileSuccess(data))
        
    } catch (error) {
        dispatch(updateProfileFailure(error.response.data.message))        
    }
} 

export const updatePassword = (formData )=> async(dispatch) => {
    try {
        dispatch(updatePasswordRequest());
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        await axios.put(`/api/v1/password/change`,formData,config)
        dispatch(updatePasswordSuccess())
        
    } catch (error) {
        dispatch(updatePasswordFailure(error.response.data.message)) 
           
    }
} 

export const forgotPassword = (formData )=> async(dispatch) => {
    try {
        dispatch(forgotPasswordRequest());
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const {data} = await axios.post(`/api/v1/password/forgot`,formData,config)
        dispatch(forgotPasswordSuccess(data))
        
    } catch (error) {
        dispatch(forgotPasswordFailure(error.response.data.message)) 
           
    }
} 

export const resetPassword = (formData,token )=> async(dispatch) => {
    try {
        dispatch(resetPasswordRequest());
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const {data} = await axios.post(`/api/v1/password/reset/${token}`,formData,config)
        dispatch(resetPasswordSuccess(data))
        
    } catch (error) {
        dispatch(resetPasswordFailure(error.response.data.message)) 
           
    }
}

export const getUsers =  async(dispatch) => {
    try {
        dispatch(usersRequest());
       
        const {data} = await axios.get('/api/v1/admin/users')
        dispatch(usersSuccess(data))
        
    } catch (error) {
        dispatch(usersFailure(error.response.data.message))        
    }
} 

export const getUser = id => async(dispatch) => {
    try {
        dispatch(userRequest());
       
        const {data} = await axios.get(`/api/v1/admin/user/${id}`)
        dispatch(userSuccess(data))
        
    } catch (error) {
        dispatch(userFailure(error.response.data.message))        
    }
} 

export const deleteUser = id => async(dispatch) => {
    try {
        dispatch(deleteUserRequest());
       
        await axios.delete(`/api/v1/admin/user/${id}`)
        dispatch(deleteUserSuccess())
        
    } catch (error) {
        dispatch(deleteUserFailure(error.response.data.message))        
    }
} 

export const updateUser = (id,formData )=> async(dispatch) => {
    try {
        dispatch(updateUserRequest());
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        await axios.put(`/api/v1/admin/user/${id}`,formData,config)
        dispatch(updateUserSuccess())
        
    } catch (error) {
        dispatch(updateUserFailure(error.response.data.message)) 
           
    }
} 