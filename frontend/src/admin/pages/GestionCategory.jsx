import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ajoutcategoryAction, deletecategoryAction, gettAllcategoryAction, updatecategoryAction } from '../../redux/actions/categoryAction'
import ModalComponent from '../components/global/ModalComponent'

const GestionCategory = () => {
   const[name,setName] = useState("")
   const[id,setId] = useState("")
  const Listcategory = useSelector(state => state.categories.categoryList) ?? []
  console.log("la liste des catégories",Listcategory)
   const dispatch = useDispatch()
   const [modaLAjoutOpen, setModalAjoutOpen]=React.useState(false)
    const [modaLDeleteOpen, setModalDeleteOpen]=React.useState(false)
     const [modalUpdateOpen, setModalUpdateOpen]=React.useState(false)
    useEffect(()=>{
   const fetchCatégories=async()=>{
     try {
         dispatch(gettAllcategoryAction())
      
     } catch (error) {
       console.error("failed to load list of catégories", error)
     }  
   }
   fetchCatégories()
      },[])

    const handleaddCategory= async(e)=>{
      e.preventDefault()
      try {
        // send an object expected by the backend
        await dispatch(ajoutcategoryAction({ name, subcategoriesId: [] }))
        // refresh list, close modal and reset field
        await dispatch(gettAllcategoryAction())
        setModalAjoutOpen(false)
        setName("")
      } catch (error) {
        console.error("failed to add", error)
      }
    }
     const handledeleteCategory= async(e)=>{
      e.preventDefault()
      try {
        // send an object expected by the backend
        await dispatch(deletecategoryAction(id))
        await dispatch(gettAllcategoryAction())
       
        setModalDeleteOpen(false)
       setId("")
      } catch (error) {
        console.error("failed to delete", error)
      }
    }
        const handleupdateCategory= async(e)=>{
      e.preventDefault()
      try {
        // send an object expected by the backend
        await dispatch(updatecategoryAction({ id, name }))
        await dispatch(gettAllcategoryAction())
       
        setModalUpdateOpen(false)
        setId("")
        setName("")
      } catch (error) {
        console.error("failed to update category", error)
      }
    }
  return (
    <div className="admin-page-card">
      <div className="admin-page-header">
        <div>
          <h5 className="admin-card-title">Gestion des Catégories</h5>
          <p className="admin-card-subtitle">Organisez vos catégories et gérez les actions rapidement.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setModalAjoutOpen(true)}>
          Ajouter une catégorie
        </button>
      </div>
      <div className="admin-table-wrapper">
        <table className="table table-striped table-hover admin-table">
          <thead>
            <tr>
              <th>Nom de la catégorie</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Listcategory?.map(i=>(
              <tr key={i._id}>
                <td>{i.name}</td>
                <td className="text-center">
                  <div className="btn-group" role="group" aria-label="Actions catégorie">
                    <button className="btn btn-outline-primary btn-sm" onClick={()=>{setId(i._id); setName(i.name); setModalUpdateOpen(true);}}>
                      <i className="fas fa-edit me-2"></i>Modifier
                    </button>
                    <button className="btn btn-outline-danger btn-sm" onClick={()=>{setId(i._id); setModalDeleteOpen(true);}}>
                      <i className="fas fa-trash me-2"></i>Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* modal de l'ajout d'une catégorie */}
   <ModalComponent  title="Ajouter une catégorie" isOpen={modaLAjoutOpen} onClose={() => setModalAjoutOpen(false)} >
      <form>
        <div className="form-group">
          <label>Nom de la catégorie</label>
          <input name="name" type="text" className="form-control" placeholder="Entrez le nom de la catégorie" required
            value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleaddCategory}>
          Ajouter
        </button>
      </form>
    </ModalComponent>
      {/* modal de suppression d'une catégorie */}
      <ModalComponent   title="Supprimer une catégorie"  isOpen={modaLDeleteOpen} onClose={() => setModalDeleteOpen(false)} >
          <div className="modal-body">
                  <p>Êtes-vous sûr de vouloir supprimer cette catégorie ?</p>
                  <button type="button" className="btn btn-danger" onClick={handledeleteCategory}>
                    Supprimer
                  </button>
            
          </div>
        </ModalComponent>

      {/* modal de modification d'une catégorie */}
       <ModalComponent   title="modifier une catégorie"  isOpen={modalUpdateOpen} onClose={() => setModalUpdateOpen(false)} >
          <div className="modal-body">
                  
                  <form>
                    <div className="form-group">
                      <label>Nom de la catégorie</label>
                      <input name="name" type="text" className="form-control" placeholder="Entrez le nom de la catégorie" required
                        value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleupdateCategory}>
                      Modifier
                    </button>
                  </form>
            
          </div>
        </ModalComponent>
     
    </div>
  )
}

          

export default GestionCategory