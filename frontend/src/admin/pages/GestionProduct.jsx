import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ajoutproduitAction, deleteproduitAction, getAllProductsAction, updateproduitAction } from '../../redux/actions/productActions'
import { gettAllSubcategoryAction } from '../../redux/actions/SubCategoryAction'
import ModalComponent from '../components/global/ModalComponent'
import { toast } from 'react-toastify';

const GestionProduct = () => {
  const dispatch=useDispatch()
  const[id,setId] = useState("")
  const[name,setName] = useState("")
  const[description,setDescription] = useState("")
  const[image,setImage] = useState("")
  const[price,setPrice] = useState("")
  const[quantity,setQuantity] = useState("")
  const[idsubcategory,setidsubcategory] = useState("")
   const [modaLAjoutOpen, setModalAjoutOpen]=React.useState(false)
      const [modaLDeleteOpen, setModalDeleteOpen]=React.useState(false)
      const [modaLUpdateOpen, setModalUpdateOpen]=React.useState(false)

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
          const formData = new FormData();
          formData.append("name",name)
          formData.append("description",description)
          formData.append("image",image)
          formData.append("price",price)
          formData.append("quantity",quantity)
          formData.append("idsubcategory",idsubcategory)
          await dispatch(ajoutproduitAction(formData))
          // refresh list, close modal and reset field
          await dispatch(getAllProductsAction())
          setModalAjoutOpen(false)
          setName("")
        } catch (error) {
          console.error("failed to add", error)
        }
      }
      const handledeleteProduct= async(e)=>{
        e.preventDefault()
        try {
       
         
          await dispatch(deleteproduitAction(id))
          // refresh list, close modal and reset field
          await dispatch(getAllProductsAction())
          setModalDeleteOpen(false)

         
        } catch (error) {
          console.error("failed to delete", error)
        }
      }
const handleOpenUpdateModal = (product) => {
        setId(product._id);
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setQuantity(product.quantity);
        setidsubcategory(product.idsubcategory);
        setModalUpdateOpen(true);
      }
      const handleupdateProduct= async(e)=>{
        e.preventDefault()  
        try {
          // send an object expected by the backend
          const formData = new FormData();
          formData.append("name",name)
          formData.append("description",description)
          formData.append("image",image)
          formData.append("price",price)
          formData.append("quantity",quantity)
          formData.append("idsubcategory",idsubcategory)
          await dispatch(updateproduitAction({id,formData}))
          // refresh list, close modal and reset field
          await dispatch(getAllProductsAction())
          setModalUpdateOpen(false)
          toast.success("produit modifié avec succès")
          setName("")
        } catch (error) {
          toast.error("failed to update")
          console.error("failed to update", error)
        }   
      } 
  return (
    <div className="admin-page-card">
      <div className="admin-page-header">
        <div>
          <h5 className="admin-card-title">Gestion des Produits</h5>
          <p className="admin-card-subtitle">Visualisez et modifiez rapidement votre catalogue produit.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setModalAjoutOpen(true)}>
          Ajouter un produit
        </button>
      </div>
      <div className="admin-table-wrapper">
        <table className="table table-striped table-hover admin-table">
          <thead>
            <tr>
              <th>Produit</th>
              <th>Description</th>
              <th>Image</th>
              <th>Prix</th>
              <th>Quantité</th>
              <th>Sous-catégorie</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listProduct.map(j=>(
              <tr key={j._id}>
                <td>{j.name}</td>
                <td>{j.description}</td>
                <td>
                  <div className="product-image-cell">
                    <img src={`http://localhost:3001/uploads/images/${j.image}`} alt={j.name} />
                  </div>
                </td>
                <td>{j.price}</td>
                <td>{j.quantity}</td>
                <td>{j.idsubcategory?.name || j.idsubcategory || '-'}</td>
                <td className="text-center">
                  <div className="btn-group" role="group" aria-label="Actions produit">
                    <button className="btn btn-outline-primary btn-sm" onClick={() => handleOpenUpdateModal(j)}>
                      <i className="fas fa-edit me-2"></i>Modifier
                    </button>
                    <button className="btn btn-outline-danger btn-sm" onClick={()=>{setId(j._id); setModalDeleteOpen(true);}}>
                      <i className="fas fa-trash me-2"></i>Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      <ModalComponent title={"Ajouter un produit"}isOpen={modaLAjoutOpen} onClose={() => setModalAjoutOpen(false)} >
        <form>
                    <div className="form-group">
                      <label>Nom de produit</label>
                      <input name="name" type="text" className="form-control" placeholder="Entrez le nom de produit" required
                      value={name} onChange={(e)=>setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>description de produit</label>
                      <input name="description" type="text" className="form-control" placeholder="Entrez la description  de produit" required
                      value={description} onChange={(e)=>setDescription(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>image de produit</label>
                      <input name="image" type="file" className="form-control" placeholder="Entrez l'image de produit" required
                       onChange={(e)=>setImage(e.target.files[0])} />
                    </div>
                    <div className="form-group">
                      <label>prix de produit</label>
                      <input name="price" type="text" className="form-control" placeholder="Entrez leprix de produit" required
                      value={price} onChange={(e)=>setPrice(e.target.value)} />
                    </div>
                     <div className="form-group">
                      <label>quantité de produit</label>
                      <input name="quantity" type="text" className="form-control" placeholder="Entrez la quantité de produit" required
                      value={quantity} onChange={(e)=>setQuantity(e.target.value)} />
                    </div>
                    {/* mapping de la liste des sousCatégories */}
                <div className="form-group">
                  <label>SubCatégorie</label>
                  <select className="form-control" value={idsubcategory} onChange={(e) => setidsubcategory(e.target.value)} required>
                    {SubcategoryList.map((subcategory) => (
                      <option key={subcategory._id} value={subcategory._id}>
                        {subcategory.name}
                      </option>
                    ))}
                  </select>
                  <button type="submit" className="btn btn-primary" onClick={handleaddProduct}>Ajouter</button>
                </div>
                  </form>
      </ModalComponent>

      <ModalComponent title={"supprimer le produit"}isOpen={modaLDeleteOpen} onClose={() => setModalDeleteOpen(false)} >
       <div className="modal-body">
                  <p>Êtes-vous sûr de vouloir supprimer cette catégorie ?</p>
                  <button type="button" className="btn btn-danger" onClick={handledeleteProduct}>
                    Supprimer
                  </button>
            
          </div>
    </ModalComponent>

    <ModalComponent title={"Modifier le produit"}isOpen={modaLUpdateOpen} onClose={() => setModalUpdateOpen(false)} >
       <div>
        
                  <form>
                    <div className="form-group">
                      <label>Nom de produit</label>
                      <input name="name" type="text" className="form-control" placeholder="Entrez le nom de produit" required
                      value={name} onChange={(e)=>setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>description de produit</label>
                      <input name="description" type="text" className="form-control" placeholder="Entrez la description  de produit" required
                      value={description} onChange={(e)=>setDescription(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>image de produit</label>
                      <input name="image" type="file" className="form-control" placeholder="Entrez l'image de produit" required
                       onChange={(e)=>setImage(e.target.files[0])} />
                    </div>
                    <div className="form-group">
                      <label>prix de produit</label>
                      <input name="price" type="text" className="form-control" placeholder="Entrez leprix de produit" required
                      value={price} onChange={(e)=>setPrice(e.target.value)} />
                    </div>
                     <div className="form-group">
                      <label>quantité de produit</label>
                      <input name="quantity" type="text" className="form-control" placeholder="Entrez la quantité de produit" required
                      value={quantity} onChange={(e)=>setQuantity(e.target.value)} />
                    </div>
                     <div className="form-group">
                  <label>SubCatégorie</label>
                  <select className="form-control" value={idsubcategory} onChange={(e) => setidsubcategory(e.target.value)} required>
                    {SubcategoryList.map((subcategory) => (
                      <option key={subcategory?._id} value={subcategory?._id}>
                        {subcategory?.name}
                      </option>
                    ))}
                  </select>
             
                  <button type="button" className="btn btn-warning" onClick={handleupdateProduct}>
                    Modifier
                  </button>
                     </div>
                  </form>
    </div>
    </ModalComponent>
    </div>
    
  )
}

export default GestionProduct