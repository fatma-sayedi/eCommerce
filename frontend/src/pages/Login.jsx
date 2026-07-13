import React, { useState } from 'react'
import Toabar from '../components/Toabar'
import Footer from '../components/Footer'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { forgotPasswordAction, loginAction } from '../redux/actions/userActions';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//schema de validation pour le formulaire de login
const loginSchema = yup.object({
  email:yup.string().required("email est obligatoire").email("veuillez entrer un email valide"),
  password:yup.string().required("password est obligatoire").min(6,"le password doit contenir au moins 6 caractères ")

})


const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const{register,handleSubmit,getValues,formState:{errors}}
= useForm({resolver:yupResolver(loginSchema)})

  const handleLogin = async (data) => {
    try {
      const{email,password}=data
      //appel de api depuis le backend //
      const result = await dispatch(loginAction({ email, password }))
     console.log("result de l'api:", result)
     const payload = result?.payload
     console.log("retour payload:", payload)
     const role = payload?.existingUser.role

     console.log("role de user connecte:", role)
      if (role === "admin") {
        navigate("/layout")
        toast.success("login successfully")
      }
      else if (role === "client") {

      navigate("/")
      toast.success("login successfully")

    }
    else if (role === "provider") {
      navigate("/provider")
      toast.success("login successfully")
    }
    } catch (error) {
      console.error("failed to login")
      toast.error("failed to login")
    }
  }
   const handleForgotPassWord = async ()=>{
      try {
        await dispatch (forgotPasswordAction({email}))
      } catch (error) {
        console.error("failed to send email")
        
      }
    }
  return (
    <div>
      <Toabar />

      <div className="container-fluid pt-5">
        <div className="text-center mb-4">
          <h2 className="section-title px-5"><span className="px-2">Contact For Any Queries</span></h2>
        </div>
        <div className="row px-xl-5">
          <div className="col-lg-7 mb-5">
            <div className="contact-form">
              <div id="success" />
              <form onSubmit={handleSubmit(handleLogin)}  name="sentMessage" id="contactForm" noValidate="novalidate">

                <div className="control-group">
                  <input  {...register("email")} value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" placeholder="Your Email" required="required" data-validation-required-message="Please enter your email" />
                 {errors.email && ( <p className="help-block text-danger" >{errors.email.message}</p>)}
                 
                </div>


                <div className="control-group">
                  <input {...register("password")} value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="subject" placeholder="Password" required="required" data-validation-required-message="Please enter a subject" />
                  {errors.password && ( <p className="help-block text-danger" >{errors.password.message}</p>)}
                 
                </div>

                <div>
                  <button className="btn btn-primary py-2 px-4" type="submit" id="sendMessageButton"
                  onClick={handleLogin}
                  >Submit</button>
                  
                </div>
               

              </form>
               <button
                  onClick={handleForgotPassWord}
                  className="btn btn-link p-0 "
                  type="submit"
                >
                  forgot password
                </button>

            </div>
          </div>
          <div className="col-lg-5 mb-5">
            <h5 className="font-weight-semi-bold mb-3">Get In Touch</h5>
            <p>Justo sed diam ut sed amet duo amet lorem amet stet sea ipsum, sed duo amet et. Est elitr dolor elitr erat sit sit. Dolor diam et erat clita ipsum justo sed.</p>
            <div className="d-flex flex-column mb-3">
              <h5 className="font-weight-semi-bold mb-3">Store 1</h5>
              <p className="mb-2"><i className="fa fa-map-marker-alt text-primary mr-3" />123 Street, New York, USA</p>
              <p className="mb-2"><i className="fa fa-envelope text-primary mr-3" />info@example.com</p>
              <p className="mb-2"><i className="fa fa-phone-alt text-primary mr-3" />+012 345 67890</p>
            </div>
            <div className="d-flex flex-column">
              <h5 className="font-weight-semi-bold mb-3">Store 2</h5>
              <p className="mb-2"><i className="fa fa-map-marker-alt text-primary mr-3" />123 Street, New York, USA</p>
              <p className="mb-2"><i className="fa fa-envelope text-primary mr-3" />info@example.com</p>
              <p className="mb-0"><i className="fa fa-phone-alt text-primary mr-3" />+012 345 67890</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />


    </div>
  )
}

export default Login