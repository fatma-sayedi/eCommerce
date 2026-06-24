import { createSlice } from "@reduxjs/toolkit"
import { addCartAction, getcartAction } from "../actions/CartAction"

const initialState = {
    error: null,
    isFetching: false,
    cart: {
        items: []
    },

}

const cartSlice=createSlice(
    {name:"cart",
     initialState,
     reducers:{},
     extraReducers:(builder)=>
{
builder


.addCase(addCartAction.pending,(state)=>
{
state.isFetching=true
state.error=null
})
.addCase(addCartAction.fulfilled,(state,{payload})=>//success
{
state.isFetching=false
state.error=null
state.cart=payload // retour d api
})
.addCase(addCartAction.rejected,(state,{payload})=>
{
state.isFetching=false
state.error=payload

})
// handle getcartAction
.addCase(getcartAction.pending, (state) => {
    state.isFetching = true
    state.error = null
})
.addCase(getcartAction.fulfilled, (state, { payload }) => {
    state.isFetching = false
    state.error = null
    state.cart = payload
})
.addCase(getcartAction.rejected, (state, { payload }) => {
    state.isFetching = false
    state.error = payload
})
} }

)

export default cartSlice.reducer