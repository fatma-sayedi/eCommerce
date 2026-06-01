import { createSlice } from "@reduxjs/toolkit"
import { loginAction, registerAction } from "../actions/userActions"

const initialState = {
    error:null,
    isFetching:false,
    curentUser:null

}
const userSlice=createSlice(
    {name:"user",
     initialState,
     reducers:{},
     extraReducers:(builder)=>
{
builder
.addCase(loginAction.pending,(state)=>
{
state.isFetching=true
state.error=null
})
.addCase(loginAction.fulfilled,(state,{payload})=>//success
{
state.isFetching=false
state.error=null
state.curentUser=payload // retour d api
})
.addCase(loginAction.rejected,(state,{payload})=>
{
state.isFetching=false
state.error=payload

})
//register reducers 

.addCase(registerAction.pending,(state)=>
{
state.isFetching=true
state.error=null
})
.addCase(registerAction.fulfilled,(state,{payload})=>//success
{
state.isFetching=false
state.error=null
state.curentUser=payload // retour d api
})
.addCase(registerAction.rejected,(state,{payload})=>
{
state.isFetching=false
state.error=payload

})



} }

)
export default userSlice.reducer