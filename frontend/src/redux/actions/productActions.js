import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProductsAction = createAsyncThunk(
 "product/getAll",
 async(_, { rejectWithValue }) => {
    try {
         const response = await axios.get('http://localhost:3001/product')
         return response.data
    } catch (error) {
         console.error("failed to load list of product", error)
         return rejectWithValue(error.response?.data || error.message)
    }
 }
)
export const DetailProductAction = createAsyncThunk(
 "product/detail",
 async (id, { rejectWithValue }) => {
    try {
         const response = await axios.get(`http://localhost:3001/product/${id}`)
         return response.data
    } catch (error) {
         console.error("failed to load detail of product", error)
         return rejectWithValue(error.response?.data || error.message)
    }
 }
)

export const ajoutproduitAction = createAsyncThunk(
    "product/add",
    async (productData, { rejectWithValue }) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await axios.post('http://localhost:3001/product/addproduct', productData,{headers:{Authorization:`Bearer ${accessToken}`}});
            return response.data;
        } catch (error) {
            console.error("failed to add product", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteproduitAction = createAsyncThunk(
    "product/delete",
    async (id, { rejectWithValue }) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await axios.delete(`http://localhost:3001/product/${id}` ,{headers:{Authorization:`Bearer ${accessToken}`}});
            return response.data;
        } catch (error) {
            console.error("failed to delete product", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateproduitAction = createAsyncThunk(
    "product/update",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await axios.patch(`http://localhost:3001/product/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("failed to update product", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getProductsBySubCategoryAction = createAsyncThunk(
    "product/getBySubCategory",
    async (subcategoryId, { rejectWithValue }) => {     
        try {
            const response = await axios.get(`http://localhost:3001/product/subcategory/${subcategoryId}`);
            return response.data;
        } catch (error) {
            console.error("failed to load products by subcategory", error);
            return rejectWithValue(error.response?.data || error.message);
        }   
    }
);