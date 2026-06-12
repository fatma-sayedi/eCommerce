import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addsubcategoryAction, deletesubcategoryAction, gettAllSubcategoryAction, updatesubcategoryAction } from '../../redux/actions/SubCategoryAction'
import ModalComponent from '../components/global/ModalComponent'
import { gettAllcategoryAction } from '../../redux/actions/categoryAction'
import { toast } from 'react-toastify';

const GestionSubCategory = () => {

  const[name,setName] = useState("")
   const[categoryId,setCategoryId] = useState("")
    const categoryList = useSelector(state=>state.categories.categoryList)
   const subListcategory = useSelector(state => state.subcategories.subcategoryList) ?? []
   const [modaLAjoutOpen, setModalAjoutOpen]=React.useState(false)
    const [modaLDeleteOpen, setModalDeleteOpen]=React.useState(false)
     const [modalUpdateOpen, setModalUpdateOpen]=React.useState(false)
     const[id,setId] = useState("")
    const dispatch=useDispatch()
 const handleaddsubCategory= async(e)=>{
            e.preventDefault()
            try {
              // send an object expected by the backend
              await dispatch(addsubcategoryAction({ name, 
categoryId}))
              // refresh list, close modal and reset field
              await dispatch(gettAllSubcategoryAction())
              setModalAjoutOpen(false)
              toast.success("sous catégorie ajoutée avec succès")
              setName("")
            } catch (error) {
              toast.error("failed to add")
              console.error("failed to add", error)
            }
          }
     useEffect(()=>{
       const fetchsubCatégories=async()=>{
         try {
           await dispatch(gettAllSubcategoryAction())
         } catch (error) {
           console.error("failed to load list of catégories", error)
         }  
       }
       fetchsubCatégories()
       dispatch(gettAllcategoryAction())
     },[])

     const handledeleteSubCategory= async(e)=>{
      e.preventDefault()  
      try {
        // send an object expected by the backend
        await dispatch(deletesubcategoryAction(id))
        // refresh list, close modal and reset field
        await dispatch(gettAllSubcategoryAction())
        setModalDeleteOpen(false)
        setName("")
      } catch (error) {
        toast.error("failed to delete")
        console.error("failed to delete", error)
      }
    }
     const handleupdateSubCategory= async(e)=>{
      e.preventDefault()  
      try {
        
        await dispatch(updatesubcategoryAction({ id, name, categoryId }))
      
        await dispatch(gettAllSubcategoryAction())
        setModalUpdateOpen(false)
        toast.success("sous catégorie modifiée avec succès")
        setName("")
      } catch (error) {
        console.error("failed to delete", error)
      }
    }
    
     
         
    
  return (
    <div className="admin-page-card">
      <div className="admin-page-header">
        <div>
          <h5 className="admin-card-title">Gestion des sous-catégories</h5>
          <p className="admin-card-subtitle">Associez vos sous-catégories à une catégorie existante.</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setModalAjoutOpen(true)}>Ajouter une sous-catégorie</button>
      </div>
      <div className="admin-table-wrapper">
        <table className="table table-striped table-hover admin-table">
          <thead>
            <tr>
              <th>Nom de la sous-catégorie</th>
              <th>Catégorie</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subListcategory?.map(i=>(
              <tr key={i._id}>
                <td>{i.name}</td>
                <td>{i.categoryId?.name || '-'}</td>
                <td className="text-center">
                  <div className="btn-group" role="group" aria-label="Actions sous-catégorie">
                        <button className="btn btn-outline-primary btn-sm" onClick={()=>{setId(i._id); setName(i.name); setCategoryId(i.categoryId?._id ?? i.categoryId); setModalUpdateOpen(true);}}>
                      <i className="fas fa-edit me-2"></i>Modifier
                    </button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => {
                      setName(i.name);
                      setCategoryId(i.categoryId?._id ?? i.categoryId);
                      setId(i._id);
                      setModalDeleteOpen(true);
                    }}>
                      <i className="fas fa-trash me-2"></i>Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    

       {/* modal de l'ajout d'une sous catégorie */}
   <ModalComponent  title="Ajouter une  sous catégorie" isOpen={modaLAjoutOpen} onClose={() => setModalAjoutOpen(false)} >
      <form>
        <div className="form-group">
          <label>Nom de la sous catégorie</label>
          <input name="name" type="text" className="form-control" placeholder="Entrez le nom de la sous catégorie" required
            value={name} onChange={(e) => setName(e.target.value)} />
        </div>
         <div className="form-group">
           <label>Catégorie</label>
                  <select className="form-control" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                    {categoryList.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
        </div>


        <button type="submit" className="btn btn-primary" onClick={handleaddsubCategory}>
          Ajouter
        </button>
      </form>
    </ModalComponent>
      {/* modal de suppression d'une sous catégorie */}
      <ModalComponent   title="Supprimer une sous catégorie"  isOpen={modaLDeleteOpen} onClose={() => setModalDeleteOpen(false)} >
          <div className="modal-body">  
                  <p>Êtes-vous sûr de vouloir supprimer cette sous catégorie ?</p>
                  <button type="button" className="btn btn-danger" onClick={handledeleteSubCategory}>
                    Supprimer
                  </button>
          </div>
        </ModalComponent>

          <ModalComponent   title="modifier une sous  catégorie"  isOpen={modalUpdateOpen} onClose={() => setModalUpdateOpen(false)} >
          <div className="modal-body">
                  
                  <form>
                    <div className="form-group">
                      <label>Nom de la sous catégorie</label>
                      <input name="name" type="text" className="form-control" placeholder="Entrez le nom de la sous  catégorie" required
                        value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                     <div className="form-group">
           <label>Catégorie</label>
                  <select className="form-control" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                    {categoryList.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
        </div>
                    <button type="submit" className="btn btn-primary" onClick={handleupdateSubCategory}>
                      Modifier
                    </button>
                  </form>
            
          </div>
        </ModalComponent>
     
    </div>
  )
}

export default GestionSubCategory