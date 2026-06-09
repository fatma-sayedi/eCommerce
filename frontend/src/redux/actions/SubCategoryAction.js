import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const gettAllSubcategoryAction = createAsyncThunk(
    "category/getAll",
 async(_,{rejectedWithValue})=>{
    try {
         const response =await axios.get('http://localhost:3001/subcategory')
         return response.data
    } catch (error) {
         console.error("failed to load list of subcateg", error)
         
         rejectedWithValue(error.response.data)   
        
    }
 }


)