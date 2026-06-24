import React, { useEffect, useState } from 'react'
import { deleteUserAction, getAllUsersAction, registerAction, updateUserAction } from '../../redux/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import ModalComponent from '../components/global/ModalComponent'

const GestionUsers = () => {
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")
  const [PhoneNumber, setPhoneNumber] = useState("")
  const [role, setRole] = useState("provider")
  const [modalOpenDelete, setModalOpenDelete] = useState(false)
  const [modalOpenAjout, setModalOpenAjout] = useState(false)
  const [modalOpenUpdate, setModalOpenUpdate] = useState(false)

  const dispatch = useDispatch()
  const usersList = useSelector(state => state.user.listUsers)
  console.log("liste de users ", usersList)
  useEffect(() => {
    dispatch(getAllUsersAction())


  }, [])

  const handleOpenDeleteModal = (user) => {
    setId(user)
    setModalOpenDelete(true)


  }

 

  //fonction pour ajouter un utilisateur
  const handleAddUser = async (e) => {
    e.preventDefault()
    try {
      await dispatch(registerAction({ name, email, address, PhoneNumber, role, password }))

      // refresh list, close modal and reset field
      await dispatch(getAllUsersAction())
      
      setModalOpenAjout(false)
      setName("")
      setEmail("")
      setAddress("")
      setPhoneNumber("")
      setRole("provider")
      setPassword("")
    } catch (error) {
      console.error("failed to add user", error)
    }
  }
  //ouverture du modal pour ajouter un utilisateur
 


  const handledeleteuser = async (e) => {
    e.preventDefault()
    try {

      console.log("l'id est ", id)
      await dispatch(deleteUserAction(id))
      // refresh list, close modal and reset field
      await dispatch(getAllUsersAction())
      setModalOpenDelete(false)



    } catch (error) {
      console.error("failed to delete", error)
    }
  }
 




  return (
<div className="admin-page-card">
      <div className="admin-page-header">
        <div>
          <h5 className="font-weight-semi-bold text-uppercase mb-3">GESTION USERS</h5>
          <button className="btn btn-primary py-2 px-4" type="submit" id="sendMessageButton"
          onClick={() =>setModalOpenAjout(true) }>
            Ajouter un fournisseur
          </button>
</div>
        <table className="table table-striped table-hover admin-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Address</th>
              <th>Role</th>
              <th>Phone Number</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersList.map(j => (
              <tr key={j._id}>
                <td>{j.name}</td>
                <td>{j.email}</td>
                <td>{j.address}</td>
                <td>{j.role}</td>
                <td>{j.PhoneNumber}</td>
<td className="text-center">
                  <button className="btn btn-sm btn-outline-primary mr-2" >
                    Modifier
                  </button>
                  <button className="btn btn-sm btn-outline-danger " onClick={() => handleOpenDeleteModal(j._id)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalComponent title={"ajouter un fournisseur"} isOpen={modalOpenAjout} onClose={() => setModalOpenAjout(false)}>
        <form>
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="text" className="form-control" id="phoneNumber" value={PhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select className="form-control" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="provider">Provider</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleAddUser}>
            Ajouter
          </button>
        </form>

      </ModalComponent>
      <ModalComponent title={"supprimer le utilisateur"} isOpen={modalOpenDelete} onClose={() => setModalOpenDelete(false)} >
        <div className="modal-body">
          <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
          <button type="button" className="btn btn-danger" onClick={handledeleteuser}>
            Supprimer
          </button>

        </div>
      </ModalComponent>
   
    </div>


  )
}



export default GestionUsers 