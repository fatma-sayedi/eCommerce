import React, { useState } from 'react'
import { resetPasswordAction } from '../redux/actions/userActions'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

const ResetPassword = () => {
   const [password, setPassword] = useState("")
   const[confirmPassword, setconfirmPassword] = useState("")
   const navigate = useNavigate()
   const{token}=useParams()
   const dispatch = useDispatch()

  const handleReset =async (event) => {
      try {
        event.preventDefault()
        
       await dispatch(resetPasswordAction({token,password}))
       navigate("/login")
       
  
    
        toast.success("reset password successfully")
  
      } catch (error) {
        console.error("failed to reset")
        toast.error("failed to reset password")
  
      }
    }
  return (
   <div>

    {/* Page Header Start */}
    <div className="container-fluid bg-secondary mb-5">
        <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: 300 }}
        >
        <h1 className="font-weight-semi-bold text-uppercase mb-3">RESET PASSWORD</h1>
        <div className="d-inline-flex">
          <p className="m-0">
            <a href>Home</a>
          </p>
          <p className="m-0 px-2">-</p>
          <p className="m-0">Reset Password</p>
        </div>
        </div>
        </div>
    {/* Page Header End */}
    {/* Reset Start */}
    <div className="container-fluid pt-5">
        <div className="text-center mb-4">
            <h2 className="section-title px-5">
                <span className="px-2">Reset Password</span>
            </h2>
        </div>
        <div className="row px-xl-5">
            <div className="col-lg-7 mb-5">
                <div className="Login-form">
                    <div id="success" />
                        <form name="sentMessage" id="LoginForm" noValidate="novalidate">

                            <div className="control-group">
                                <input
                                    name="passWord" //nom base de donnée
                value={password}


                                    type="password"
                                    className="form-control"
                                    id="pasword"
                                    placeholder="Your New Password"
                                    required="required"
onChange={(e) => setPassword(e.target.value)}
                                />
                                <p className="help-block text-danger" />
                            </div>

                            <div className="control-group">
                                <input
                                  value={confirmPassword}
                                
                                    type="password"
                                    className="form-control" 
                                    id="pasword"
                                    placeholder="Confirm Your New Password"
                                    required="required"
onChange={(e) => setconfirmPassword(e.target.value)}
                                />
                                <p className="help-block text-danger" />
                            </div>

                            {/* <div
                                className="d-felx justify-content-between align-items-center mb-3 "
                                style={{ gap: "15px" }}
                            > */}
                            <div>
                                <button
                                   
                                    className="btn btn-primary py-2 px-4 " onClick={handleReset}
                                    type="submit"
                                    id="sendMessageButton"
                                >
                                 submit
                                </button>

                              
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-lg-5 mb-5">
                    <h5 className="font-weight-semi-bold mb-3">Get In Touch</h5>
                    <p>
                        Justo sed diam ut sed amet duo amet lorem amet stet sea ipsum, sed
                        duo amet et. Est elitr dolor elitr erat sit sit. Dolor diam et erat
                        clita ipsum justo sed.
                    </p>
                    <div className="d-flex flex-column mb-3">
                        <h5 className="font-weight-semi-bold mb-3">Store 1</h5>
                        <p className="mb-2">
                            <i className="fa fa-map-marker-alt text-primary mr-3" />
                            123 Street, New York, USA
                        </p>
                        <p className="mb-2">
                            <i className="fa fa-envelope text-primary mr-3" />
                            info@example.com
                        </p>
                        <p className="mb-2">
                            <i className="fa fa-phone-alt text-primary mr-3" />
                            +012 345 67890
                        </p>
                    </div>
                    <div className="d-flex flex-column">
                        <h5 className="font-weight-semi-bold mb-3">Store 2</h5>
                        <p className="mb-2">
                            <i className="fa fa-map-marker-alt text-primary mr-3" />
                            123 Street, New York, USA
                        </p>
                        <p className="mb-2">
                            <i className="fa fa-envelope text-primary mr-3" />
                            info@example.com
                        </p>
                        <p className="mb-0">
                            <i className="fa fa-phone-alt text-primary mr-3" />
                            +012 345 67890
                        </p>
                    </div>
                </div>
            </div>
        </div>
    {/* Reset End */}

  </div>
  )
}

export default ResetPassword