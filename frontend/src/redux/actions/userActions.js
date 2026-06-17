import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

export const loginAction=createAsyncThunk(
    "user/login",
    async ({email,password},{rejectwithvalue})=>{
        try {
             const response=await axios.post("http://localhost:3001/auth/login",{email,password})
             const accessToken =localStorage.setItem("accessToken",response.data.tokens.accessToken)
             const refreshToken = localStorage.setItem("refreshToken",response.data.tokens.accessToken)
             return response.data        } 
             catch (error) {
        
         rejectwithvalue(error.response.data)   
        }
    }
)
export const registerAction=createAsyncThunk(
    "user/register",
    async ({name,email,address,phoneNumber,password},{rejectwithvalue})=>{
        try {
            const response=await axios.post("http://localhost:3001/auth/register",{name,email,address,phoneNumber,password})
             return response.data        } 
             catch (error) {
        
         rejectwithvalue(error.response.data)   
        }
    }
)

export const forgotPasswordAction=createAsyncThunk(

    "user/forgot",
    async({email},{rejectwithvalue})=>{

         try {
            const response=await axios.post("http://localhost:3001/auth/forgotPassword",{email})
             return response.data        } 
             catch (error) {
        
         rejectwithvalue(error.response.data)   
        }
    }

)


export const logoutAction=createAsyncThunk(
    "user/logout",
    async(_,{rejectwithvalue})=>{


            try {   
                   const accessToken =localStorage.getItem("accessToken")
             const refreshToken = localStorage.getItem("refreshToken")
                const response=await axios.get("http://localhost:3001/auth/logout",{headers:{Authorization:`Bearer ${accessToken}`}})
                localStorage.removeItem("accessToken")
                  localStorage.removeItem("refreshToken")
                return response.data
            }
            catch (error) {
                rejectwithvalue(error.response.data)
            }
    }
)

export const resetPasswordAction=createAsyncThunk(
    "user/reset",
    async({token,password},{rejectwithvalue})=>{

         try {
            const response=await axios.post(`http://localhost:3001/auth/reset/${token}`, { password })
             return response.data        } 
             catch (error) {
        
         rejectwithvalue(error.response.data)   
        }
    }
)