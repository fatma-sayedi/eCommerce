import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const gettAllSubcategoryAction = createAsyncThunk(
    "Subcategory/getAll",
 async(_, { rejectWithValue })=>{
    try {
         const response = await axios.get('http://localhost:3001/subcategory')
         return response.data
    } catch (error) {
         console.error("failed to load list of subcateg", error)
         return rejectWithValue(error.response?.data || error.message)
    }
 }
)

export const addsubcategoryAction = createAsyncThunk(
    "Subcategory/add",
 async({ name, categoryId }, { rejectWithValue })=>{
    try {
         const response = await axios.post('http://localhost:3001/subcategory', { name, categoryId })
         return response.data
    } catch (error) {
         console.error("failed to add subcategory", error)
         return rejectWithValue(error.response?.data || error.message)
    }
 }
)
export const deletesubcategoryAction = createAsyncThunk(
    "Subcategory/delete",
 async(id, { rejectWithValue })=>{
    try {
         const response = await axios.delete(`http://localhost:3001/subcategory/${id}`)
         return response.data
    } catch (error) {
         console.error("failed to delete subcategory", error)
         return rejectWithValue(error.response?.data || error.message)
    }
 }
)

export const updatesubcategoryAction = createAsyncThunk(
    "Subcategory/update",
 async({ id, name, categoryId }, { rejectWithValue })=>{
    try {
         const response = await axios.patch(`http://localhost:3001/subcategory/${id}`, { name, categoryId })
         return response.data
    } catch (error) {
         console.error("failed to update subcategory", error)
         return rejectWithValue(error.response?.data || error.message)
    }
 }
)

