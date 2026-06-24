import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const addCartAction = createAsyncThunk(
    "cart/add",
    async ({product,quantity}, { rejectedWithValue }) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await axios.post('http://localhost:3001/cart/addProducttoCart', {product,quantity}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("failed to add cart", error);
            return rejectedWithValue(error.response.data);
        }
    }
);

export const getcartAction = createAsyncThunk(
    "cart/getAll",
 async(_,{rejectedWithValue})=>{
    try {
         const accessToken = localStorage.getItem("accessToken");
         const response =await axios.get('http://localhost:3001/cart/getCart', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
         return response.data
    } catch (error) {
         console.error("failed to load the cart", error)
         
         rejectedWithValue(error.response.data)   
        
    }
 }
)
export const deletecartAction = createAsyncThunk(
    "cart/delete",
 async(productId,{rejectedWithValue})=>{
    try {
         const accessToken = localStorage.deleteItem("accessToken");
         const response =await axios.get(`http://localhost:3001/cart/deleteProductFromCart/${productId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
         return response.data
    } catch (error) {
         console.error("failed to delete", error)
         
         rejectedWithValue(error.response.data)   
        
    }
 }
)