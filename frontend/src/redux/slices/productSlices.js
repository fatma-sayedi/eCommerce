import { createSlice } from "@reduxjs/toolkit"
import { ajoutproduitAction, DetailProductAction, getAllProductsAction, getProductsBySubCategoryAction } from "../actions/productActions"

const initialState = {
    error:null,
    isFetching:false,
   productlist: [],
   productsBySubCategory: [],
   productDetail:null

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

.addCase(DetailProductAction.pending,(state)=>
{
state.isFetching=true
state.error=null
})
.addCase(DetailProductAction.fulfilled,(state,{payload})=>//success
{
state.isFetching=false
state.error=null
state.productDetail=payload
})
.addCase(DetailProductAction.rejected,(state,{payload})=>
{
state.isFetching=false
state.error=payload

})


.addCase(ajoutproduitAction.pending,(state)=>
{
state.isFetching=true
state.error=null
})
.addCase(ajoutproduitAction.fulfilled,(state,{payload})=>//success
{
state.isFetching=false
state.error=null
state.productDetail=payload
})
.addCase(ajoutproduitAction.rejected,(state,{payload})=>
{
state.isFetching=false
state.error=payload

})

.addCase(getProductsBySubCategoryAction.pending,(state)=>
{
state.isFetching=true
state.error=null
})
.addCase(getProductsBySubCategoryAction.fulfilled,(state,{payload})=>//success
{
state.isFetching=false
state.error=null
state.productsBySubCategory=payload
})
.addCase(getProductsBySubCategoryAction.rejected,(state,{payload})=>
{
state.isFetching=false
state.error=payload
})

} }

)

export default productSlice.reducer