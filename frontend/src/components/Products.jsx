import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Toabar from './Toabar'
import axios from "axios";
import { getAllProductsAction } from '../redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux';

const Products = () => {

  /* const [ListProduct, setListProduct] = useState([]) */
  const ListProduct=useSelector(state=>state.product.productlist)
  /* state.nameofSlice.initialState */
    const dispatch = useDispatch()
  //Affichage du contenu de la page dynamiquement
  useEffect(() => {
    //fonction fléchée 
    const fetchProduct =async () => {
      try {
        //appel de api depuis le backend
    await dispatch(getAllProductsAction({}))
        /* setListProduct(response.data) */
       /*  console.log("list des produits",response.data) */

        console.log("List of Product loaded successfully")
      } catch (error) {
        console.error("failed to load list of product", error)

      }
    }
    fetchProduct()
  }, [])
  return (

    <div>   {/* Products Start */}

      <div className="container-fluid pt-5">
        <div className="text-center mb-4">
          <h2 className="section-title px-5"><span className="px-2">Trandy Products</span></h2>
        </div>
        <div className="row px-xl-5 pb-3">

          {ListProduct.map((i) => (
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
              <div className="card product-item border-0 mb-4">
                <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                  
                  <img className="img-fluid w-100" src={`http://localhost:3001/uploads/images/${i.image}`} alt />
                </div>
                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                  <h6 className="text-truncate mb-3">{i.name}</h6>
                  <div className="d-flex justify-content-center">
                    <h6>{i.price}</h6><h6 className="text-muted ml-2"><del>{i.oldPrice}</del></h6>
                  </div>
                </div>
                <div className="card-footer d-flex justify-content-between bg-light border">
                  <Link to={`/detail/${i._id}`} className="btn btn-sm text-dark p-0"><i className="fas fa-eye text-primary mr-1" />View Detail</Link>
                  <a href className="btn btn-sm text-dark p-0"><i className="fas fa-shopping-cart text-primary mr-1" />Add To Cart</a>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
      {/* Products End */}</div>

  )
}

export default Products