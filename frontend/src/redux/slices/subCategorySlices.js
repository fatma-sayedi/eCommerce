import { createSlice } from "@reduxjs/toolkit"
import { gettAllSubcategoryAction } from "../actions/SubCategoryAction"




const initialState = {
    error:null,
    isFetching:false,
   subcategoryList: []
}

const subcategorySlice=createSlice(
    {
    name:"subcategories",
     initialState,
     reducers:{},
     extraReducers:(builder)=>
{
builder
.addCase(gettAllSubcategoryAction.pending,(state)=>
{
state.isFetching=true
state.error=null
})
.addCase(gettAllSubcategoryAction.fulfilled,(state,{payload})=>//success
{
state.isFetching=false
state.error=null
state.subcategoryList=payload // retour d api
})
.addCase(gettAllSubcategoryAction.rejected,(state,{payload})=>
{
state.isFetching=false
state.error=payload

})


} }

)
export default subcategorySlice.reducer



