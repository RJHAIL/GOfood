import React, { useState } from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';



export default function Login() {

  const navigate = useNavigate();
  const[crendentials,setcredential] = useState({email:"",password:""})

  const onChange =(event)=>
  {
      setcredential({...crendentials , [event.target.name]:event.target.value})
  }
  const handleSubmit= async (event)=>
  {
    event.preventDefault()
         const response = await fetch("http://localhost:2002/api/loginuser",{
          
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({ email:crendentials.email , password:crendentials.password })

         })

         const json = await response.json()
         console.log(json)
         if(!json.success)
         {
          toast.error("Invalid Email or Password!!")
         }
         if(json.success)
         {
          localStorage.setItem("userEmail",crendentials.email );
          localStorage.setItem("authToken",json.authToken);
          navigate('/');
          toast.success("Login Successful");
         }
        

  }
  return (

   <>
   <div>
        <Navbar />
      </div>

    <div  className="container ">
       <h2 className='text-center mt-5 font-weight-bold text-success h1'>Login</h2>
      <form   className='w-50 m-auto mt-5  bg-white  rounded' onSubmit={handleSubmit}>
  <div className="form-group mb-3 dis ">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email'  value={crendentials.email} onChange={onChange} placeholder="Enter Your email"/>
  </div>
  <div className="form-group mb-3">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password'   value={crendentials.password}  onChange={onChange} placeholder=" Enter Your Password"/>
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
  <Link to="/createuser" className='btn btn-danger m-3' >I'M New User</Link>
</form>
</div>
    </>
  )
}
