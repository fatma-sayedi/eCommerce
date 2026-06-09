import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const gettAllcategoryAction = createAsyncThunk(
    "category/getAll",
 async(_,{rejectedWithValue})=>{
    try {
         const response =await axios.get('http://localhost:3001/category')
         return response.data
    } catch (error) {
         console.error("failed to load list of product", error)
         
         rejectedWithValue(error.response.data)   
        
    }
 }


)

export const ajoutcategoryAction = createAsyncThunk(
    "category/add",
    async (categoryData, { rejectedWithValue }) => {
        try {
            const response = await axios.post('http://localhost:3001/category', categoryData);
            return response.data;
        } catch (error) {
            console.error("failed to add category", error);
            return rejectedWithValue(error.response.data);
        }
    }
);