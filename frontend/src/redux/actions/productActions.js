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
export const DetailProductAction = createAsyncThunk(
 "product/detail",
 
 async(id,{rejectedWithValue})=>{
    try {

         const response =await axios.get(`http://localhost:3001/product/${id}`)
         return response.data
    } catch (error) {
         console.error("failed to load detail of product", error)
         
         rejectedWithValue(error.response.data)   
        
    }
 }
)

export const ajoutproduitAction = createAsyncThunk(
    "product/add",
    async (productData, { rejectedWithValue }) => {
        try {
            const response = await axios.post('http://localhost:3001/produit', productData);
            return response.data;
        } catch (error) {
            console.error("failed to add product", error);
            return rejectedWithValue(error.response.data);
        }
    }
);