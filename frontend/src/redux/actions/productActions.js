import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProductsAction = createAsyncThunk(
 "product/getAll",
 async(_,{rejectedWithValue})=>{
    try {
         const response =await axios.get('http://localhost:3001/product')
         return response.data
    } catch (error) {
         console.error("failed to load list of product", error)
         
         rejectedWithValue(error.response.data)   
        
    }
 }
)