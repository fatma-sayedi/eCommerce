import { createSlice } from "@reduxjs/toolkit"
import { getAllProductsAction } from "../actions/productActions"

const initialState = {
    error:null,
    isFetching:false,
   productlist: []

}

const productSlice=createSlice(
    {name:"product",
     initialState,
     reducers:{},
     extraReducers:(builder)=>
{
builder


.addCase(getAllProductsAction.pending,(state)=>
{
state.isFetching=true
state.error=null
})
.addCase(getAllProductsAction.fulfilled,(state,{payload})=>//success
{
state.isFetching=false
state.error=null
state.productlist=payload // retour d api
})
.addCase(getAllProductsAction.rejected,(state,{payload})=>
{
state.isFetching=false
state.error=payload

})
} }

)

export default productSlice.reducer