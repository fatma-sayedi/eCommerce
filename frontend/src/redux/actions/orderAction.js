import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const createOrderfromCartAction = createAsyncThunk(
    "order/create",
    async (_, { rejectedWithValue }) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await axios.post('http://localhost:3001/order', {},
               {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("failed to order", error);
            return rejectedWithValue(error.response.data);
        }
    }
);