import { createSlice } from "@reduxjs/toolkit"
import { ajoutcategoryAction, gettAllcategoryAction } from "../actions/categoryAction"


const initialState = {
    error:null,
    isFetching:false,
   categoryList: []
}

const categorySlice=createSlice(
    {
    name:"categories",
     initialState,
     reducers:{},
     extraReducers:(builder)=>
{
builder
.addCase(gettAllcategoryAction.pending,(state)=>
{
state.isFetching=true
state.error=null
})
.addCase(gettAllcategoryAction.fulfilled,(state,{payload})=>//success
{
state.isFetching=false
state.error=null
state.categoryList=payload // retour d api
})
.addCase(gettAllcategoryAction.rejected,(state,{payload})=>
{
state.isFetching=false
state.error=payload

})

.addCase(ajoutcategoryAction.pending,(state)=>
{
state.isFetching=true
state.error=null
})
.addCase(ajoutcategoryAction.fulfilled,(state,{payload})=>//success
{
state.isFetching=false
state.error=null

})
.addCase(ajoutcategoryAction.rejected,(state,{payload})=>
{
state.isFetching=false
state.error=payload

})
} }

)
export default categorySlice.reducer



