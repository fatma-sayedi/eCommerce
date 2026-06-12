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

import { ToastContainer } from 'react-toastify';
import ResetPassword from './pages/ResetPassword';
import LayoutAdmin from './admin/pages/LayoutAdmin';
import GestionProduct from './admin/pages/GestionProduct';
import GestionCategory from './admin/pages/GestionCategory';
import GestionSubCategory from './admin/pages/GestionSubCategory';
import GestionUsers from './admin/pages/GestionUsers';
import Dashboard from './admin/pages/Dashboard';

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={6000} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop/:id" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/detail/:id" element={<DetailProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/reset" element={<ResetPassword />} />
          {/*  Route impriquées */}
          <Route path="/layout" element={<LayoutAdmin />}>
            <Route path="gestionproduct" element={<GestionProduct />} />
            <Route path="gestioncategory" element={<GestionCategory />} />
            <Route path="gestionsubcategory" element={<GestionSubCategory />} />
            <Route path="gestionusers" element={<GestionUsers />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>



        </Routes>
      </BrowserRouter>

    </div>

  );
}

export default App;
