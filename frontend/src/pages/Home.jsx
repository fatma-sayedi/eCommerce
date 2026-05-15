import React from 'react'
import Toabar from '../components/Toabar'
import Navbar from '../components/Navbar'
import Feature from '../components/Feature'
import Products from '../components/Products'
import Footer from '../components/Footer'
import Checkout from './Checkout'

const Home = () => {
  return (
    <div>
         <Toabar/>
         <Navbar/>
         <Feature/>
         <Products/>
        
         <Footer/>
    </div>
   
  )
}

export default Home