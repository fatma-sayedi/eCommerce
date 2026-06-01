import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginAction=createAsyncThunk(
    "user/login",
    async ({email,password},{rejectwithvalue})=>{
        try {
             const response=await axios.post("http://localhost:3001/auth/login",{email,password})
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