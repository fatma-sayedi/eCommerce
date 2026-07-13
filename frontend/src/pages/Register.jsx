import React, { useState } from 'react'
import Toabar from '../components/Toabar'
import Footer from '../components/Footer'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerAction } from '../redux/actions/userActions';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const registerSchema = yup.object({
  
  name:yup.string().required("name est obligatoire").min(3,"le nom doit contenir au moins 3 caractères "),
    email:yup.string().required("email est obligatoire").email("veuillez entrer un email valide"),
    password:yup.string().required("password est obligatoire").min(6,"le password doit contenir au moins 6 caractères "),
    PhoneNumber:yup.string().required("number est obligatoire").min(8,"le numero doit contenir au moins 8 caractères "),
    address:yup.string().required("adresse est obligatoire").min(4,"le adresse doit contenir au moins 4 caractères ")

})
const Register = () => {
  const[name,setName] = useState("")
const[email,setEmail]= useState("")
const[address,setAddress]= useState("")
const[phoneNumber,setPhoneNumber]= useState("")
const[password,setPassword]= useState("")
const navigate = useNavigate()
  const dispatch = useDispatch()
 const{register,handleSubmit,getValues,formState:{errors}}
= useForm({resolver:yupResolver(registerSchema)})
const handleRegister = async(data)=>{

try {
  const data={name,email,address,phoneNumber,password}
 
    dispatch(registerAction({name,email,address,phoneNumber,password}))
        navigate("/login")
  
} catch (error) {
  console.error("failed to register")

  
}

}
  return (
    
    <div>
        <Toabar/>
  {/* Contact Start */}
<div className="container-fluid pt-5">
  <div className="text-center mb-4">
    <h2 className="section-title px-5"><span className="px-2">Contact For Any Queries</span></h2>
  </div>
  <div className="row px-xl-5">
    <div className="col-lg-7 mb-5">
      <div className="contact-form">
        <div id="success" />
        <form  onSubmit={handleSubmit(handleRegister)} name="sentMessage" id="contactForm" noValidate="novalidate">
          <div className="control-group">
            <input {...register("name")}  value ={name} onChange={(e)=>setName(e.target.value)} type="text" className="form-control" id="name" placeholder="Your Full Name" required="required" data-validation-required-message="Please enter your name" />
              {errors.name && ( <p className="help-block text-danger" >{errors.name.message}</p>)}
          </div>
          <div className="control-group">
            <input  value ={email} onChange={(e)=>setEmail(e.target.value)}type="email" className="form-control" id="email" placeholder="Your Email" required="required" data-validation-required-message="Please enter your email" />
           {errors.email && ( <p className="help-block text-danger" >{errors.email.message}</p>)}
          
          </div>
            <div className="control-group">
            <input  {...register("address")} value ={address} onChange={(e)=>setAddress(e.target.value)} type="text" className="form-control" id="address" placeholder="Address" required="required" data-validation-required-message="Please enter your email" />
           {errors.address && ( <p className="help-block text-danger" >{errors.address.message}</p>)}
          </div>
          
          <div className="control-group">
            <input  {...register("password")} value ={password} onChange={(e)=>setPassword(e.target.value)}  type="password" className="form-control" id="subject" placeholder="Password" required="required" data-validation-required-message="Please enter a subject" />
            {errors.password && ( <p className="help-block text-danger" >{errors.password.message}</p>)}
          </div>
            <div className="control-group">
            <input {...register("phoneNumber")}  value ={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} type="number" className="form-control" id="email" placeholder="Your Phone Number" required="required" data-validation-required-message="Please enter your email" />
            {errors.phoneNumber && ( <p className="help-block text-danger" >{errors.phoneNumber.message}</p>)}
          </div>
           <div>
                            <button className="btn btn-primary py-2 px-4" type="submit" id="sendMessageButton">Submit</button>
                        </div>
         
          
        </form>
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
{/* Contact End */}


        <Footer/>
        </div>
  )
}

export default Register