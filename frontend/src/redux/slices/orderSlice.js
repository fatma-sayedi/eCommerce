import { createSlice } from "@reduxjs/toolkit"
import { createOrderfromCartAction } from "../actions/orderAction"


const initialState = {
    error: null,
    isFetching: false,
    order: null 

}

const orderSlice=createSlice(
    {name:"order",
     initialState,
     reducers:{},
     extraReducers:(builder)=>
{
builder


.addCase(createOrderfromCartAction.pending,(state)=>
{
state.isFetching=true
state.error=null
})
.addCase(createOrderfromCartAction.fulfilled,(state,{payload})=>//success
{
state.isFetching=false
state.error=null
state.order=payload // retour d api
})
.addCase(createOrderfromCartAction.rejected,(state,{payload})=>
{
state.isFetching=false
state.error=payload

})

} }

)

export default orderSlice.reducer