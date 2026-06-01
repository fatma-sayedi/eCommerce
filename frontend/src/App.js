import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Shop from './pages/Shop';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart';
import DetailProduct from './pages/DetailProduct';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path = "/" element = { <Home/>}/>
         <Route path = "/shop" element = { <Shop/>}/>
           <Route path = "/cart" element = { <Cart />}/>
            <Route path = "/detail/:id" element = { <DetailProduct />}/>
               <Route path = "/login" element = { <Login />}/>
                  <Route path = "/register" element = { <Register />}/>
                  <Route path = "/checkout" element = { <Checkout />}/>

      </Routes>
      </BrowserRouter>
   
    </div>

  ); 
}

export default App;
