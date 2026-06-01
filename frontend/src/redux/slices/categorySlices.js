import { createSlice } from "@reduxjs/toolkit"
import { gettAllcategoryAction } from "../actions/categoryAction"


const initialState = {
    error:null,
    isFetching:false,
   categorylist: []

}

const categorySlice=createSlice(
    {name:"category",
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
state.categorylist=payload // retour d api
})
.addCase(gettAllcategoryAction.rejected,(state,{payload})=>
{
state.isFetching=false
state.error=payload

})
} }

)

export default categorySlice.reducer