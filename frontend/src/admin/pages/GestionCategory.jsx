import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ajoutcategoryAction, gettAllcategoryAction } from '../../redux/actions/categoryAction'

const GestionCategory = () => {
   const[name,setName] = useState("")
  const Listcategory = useSelector(state => state.categories.categoryList) ?? []
  console.log("la liste des catégories",Listcategory)
   const dispatch = useDispatch()
   const [modaLAjoutOpen, setModalAjoutOpen]=React.useState(false)
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
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <h5>Gestion des Catégories</h5>
      <button className="btn btn-primary" onClick={() => setModalAjoutOpen(true)}>
        Ajouter une catégorie
      </button>
      </div>
      {/* Ajoutez ici votre logique pour gérer les catégories */}
      <div style={{marginTop:"20px"}}>
        
        {/* Liste des catégories */}
        <table className="table">
          <thead>
            <tr>
             
              <th>Nom de la catégorie</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Listcategory?.map(i=>(
              <tr key={i._id}>
              <td>{i.name}</td>
              <td>
                <button className="btn  outline-primary "><i className="fas fa-edit"></i> Modifier</button>
                <button className="btn outline-danger"><i className="fas fa-trash "></i> Supprimer</button>
              </td>
            </tr>
            ))}
         
           
          </tbody>
        </table>
      </div>
      {/* modal de l'ajout d'une catégorie */}
      {modaLAjoutOpen && (
        <>
          <div className="modal fade show" id="addCategoryModal" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Ajouter une catégorie</h5>
                  <button type="button" className="close" onClick={() => setModalAjoutOpen(false)}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label>Nom de la catégorie</label>
                      <input name="name" type="text" className="form-control" placeholder="Entrez le nom de la catégorie" required
                      value={name} onChange={(e)=>setName(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleaddCategory}>Ajouter</button>
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

          

export default GestionCategory