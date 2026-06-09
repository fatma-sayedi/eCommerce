import React from 'react'
import Toabar from '../../components/Toabar'
import SideBarDashboard from '../components/SideBarDashboard'
import { Outlet } from 'react-router-dom'

const LayoutAdmin = () => {
  return (
    <div className='container-fluid p-0 overflow-hidden'>
     <Toabar/>
     
        <div className="row "style={{ backgroundColor:"#f8f9fa",minHeight:"100vh"}}>
          <div className="col-3">
          <SideBarDashboard/>
          </div>
          <div className="col-9">
           <Outlet/>
          </div>
      
      </div>   

    </div>
  )
}

export default LayoutAdmin