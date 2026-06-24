import { createSlice } from "@reduxjs/toolkit"
import { forgotPasswordAction, getAllUsersAction, loginAction, logoutAction, registerAction } from "../actions/userActions"

const initialState = {
    error:null,
    isFetching:false,
    curentUser:null,
    listUsers: []

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

.addCase(forgotPasswordAction.pending,(state)=>
{
state.isFetching=true
state.error=null
})
.addCase(forgotPasswordAction.fulfilled,(state,{payload})=>//success
{
state.isFetching=false
state.error=null
state.curentUser=payload // retour d api
})
.addCase(forgotPasswordAction.rejected,(state,{payload})=>
{
state.isFetching=false
state.error=payload

})
.addCase(logoutAction.pending,(state)=>
{
state.isFetching=true
state.error=null    
})
.addCase(logoutAction.fulfilled,(state,{payload})=>//success
{
state.isFetching=false
state.error=null
state.curentUser=null // retour d api
})
.addCase(logoutAction.rejected,(state,{payload})=>
{
state.isFetching=false
state.error=payload     
})

.addCase(getAllUsersAction.pending,(state)=>
{
state.isFetching=true
state.error=null    
})
.addCase(getAllUsersAction.fulfilled,(state,{payload})=>//success
{
state.isFetching=false
state.error=null
state.listUsers=payload // retour d api
})
.addCase(getAllUsersAction.rejected,(state,{payload})=>
{
state.isFetching=false
state.error=payload     
})
} }



)
export default userSlice.reducer