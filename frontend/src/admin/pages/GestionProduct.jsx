import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ajoutproduitAction, getAllProductsAction } from '../../redux/actions/productActions'
import { gettAllSubcategoryAction } from '../../redux/actions/SubCategoryAction'

const GestionProduct = () => {
  const dispatch=useDispatch()
  const[name,setName] = useState("")
  const[description,setDescription] = useState("")
  const[image,setImage] = useState("")
  const[prix,setPrix] = useState("")
  const[quantité,setQuantite] = useState("")
  const[subcategoryId,setsubCategoryId] = useState("")
   const [modaLAjoutOpen, setModalAjoutOpen]=React.useState(false)
  const listProduct = useSelector(state=>state.product.productlist)
  const SubcategoryList = useSelector(state=>state.subcategories.subcategoryList)
  useEffect(()=>{
    dispatch(getAllProductsAction())
    dispatch(gettAllSubcategoryAction())

  },[])
   const handleaddProduct= async(e)=>{
        e.preventDefault()
        try {
          // send an object expected by the backend
          await dispatch(ajoutproduitAction({ name, subcategoryId }))
          // refresh list, close modal and reset field
          await dispatch(getAllProductsAction())
          setModalAjoutOpen(false)
          setName("")
        } catch (error) {
          console.error("failed to add", error)
        }
      }
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"}}>
        <h5>Gestion des Produits</h5>
        <button  className="btn btn-primary" onClick={() => setModalAjoutOpen(true)}>
          Ajouter un produit
        </button>
        </div>
        {/* Ajoutez ici votre logique pour gérer les produits */}
        <div style={{marginTop:"20px"}}>
          {/* Liste des produits */}
          <table className="table">
            <thead> 
              <tr>
                <th>Nom du produit</th>
                <th>description</th>
                <th>image</th>
                <th>Prix</th>
                <th>quantité</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Mappez vos produits ici */}
            {listProduct.map(j=>(
             <tr key={j._id}>
              <td>{j.name}</td>
              <td>{j.description}</td>
              <td ><img src={`http://localhost:3001/uploads/images/${j.image}`} alt={j.name} style={{ width: '100px', height: '100px' }} /></td>
              <td>{j.price}</td>
              <td>{j.quantity}</td>

              <td>
                  <button className="btn btn-sm btn-warning">Modifier</button>
                  <button className="btn btn-sm btn-danger">Supprimer</button>
                </td>
              </tr>
            ))}
              
            </tbody>
          </table>

      </div>

       {modaLAjoutOpen && (
        <>
          <div className="modal fade show" id="addProductModal" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Ajouter un produit</h5>
                  <button type="button" className="close" onClick={() => setModalAjoutOpen(false)}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label>Nom de produit</label>
                      <input name="name" type="text" className="form-control" placeholder="Entrez le nom de produit" required
                      value={name} onChange={(e)=>setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>description de produit</label>
                      <input name="name" type="text" className="form-control" placeholder="Entrez la description  de produit" required
                      value={description} onChange={(e)=>setDescription(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>image de produit</label>
                      <input name="name" type="text" className="form-control" placeholder="Entrez l'image de produit" required
                      value={image} onChange={(e)=>setImage(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>prix de produit</label>
                      <input name="name" type="text" className="form-control" placeholder="Entrez leprix de produit" required
                      value={prix} onChange={(e)=>setPrix(e.target.value)} />
                    </div>
                     <div className="form-group">
                      <label>quantité de produit</label>
                      <input name="name" type="text" className="form-control" placeholder="Entrez la quantité de produit" required
                      value={quantité} onChange={(e)=>setQuantite(e.target.value)} />
                    </div>
                    {/* mapping de la liste des sousCatégories */}
                <div className="form-group">
                  <label>SubCatégorie</label>
                  <select className="form-control" value={subcategoryId} onChange={(e) => setsubCategoryId(e.target.value)} required>
                    {SubcategoryList.map((subcategory) => (
                      <option key={subcategory._id} value={subcategory._id}>
                        {subcategory.name}
                      </option>
                    ))}
                  </select>
                  <button type="submit" className="btn btn-primary" onClick={handleaddProduct}>Ajouter</button>
                </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  )
}

export default GestionProduct