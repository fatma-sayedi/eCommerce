import React from 'react'
import { Link } from 'react-router-dom'

const SideBarDashboard = () => {
  return (
    <div style={{backgroundColor:"#f0f0f0",height:"100vh",padding:"20px"}}>
        <ul style={{listStyleType:"none",padding:"0"}} className="list-group">
            <li className="list-group-item"><Link to="/layout/dashboard">Dashboard</Link></li>
            <li className="list-group-item"><Link to="/layout/gestionusers">Gestion Users</Link></li>
            <li className="list-group-item"><Link to="/layout/gestioncategory">Gestion Category</Link></li>
            <li className="list-group-item"><Link to="/layout/gestionsubcategory">Gestion SubCategory</Link></li>
            <li className="list-group-item"><Link to="/layout/gestionproduct">Gestion Product</Link></li>
        </ul>
    </div>
  )
}

export default SideBarDashboard