import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar';
import {  toast } from 'react-toastify';


function Signup() {
  const navigate = useNavigate();

  const[credential,setcredential] = useState({username:"",email:"",location:"",password:""});

  const onChange=(event)=>
  {
       setcredential({...credential,[event.target.name]:event.target.value})
      
  }
    const handleSubmit = async (e)=>
        {
            e.preventDefault();
            const response = await fetch("http://localhost:2002/api/createuser",{
             
              method:"POST",
            
              headers:{
              'Content-Type':"application/json"
             },
             body:JSON.stringify({name:credential.username,email:credential.email,location:credential.location,password:credential.password})
            })

            const json = await response.json()
            console.log(json)

            if(!json.success)
            {
              
              toast.error("Give valid crendentials");

            }
           
            
            if(json.success)
              {
                if (json.message) {
                  toast.error("user already exists");
              }
                  else
                  navigate('/login')
              }
        }
  return (

   
    <>
    
    <div>
        <Navbar />
      </div>
    
    <div className='container'>
  
    <h2 className='text-center mt-5 font-weight-bold text-success h1'>Sign Up</h2>
      <form  className='w-50 m-auto mt-5  bg-white  rounded' onSubmit={handleSubmit}>
      <div className="form-group mb-3">
    <label htmlFor="exampleInputusername">Username</label>
    <input type="text" className="form-control"  placeholder="Enter Full Name" name='username' value={credential.username} onChange={onChange}/>
  </div>

  <div className="form-group mb-3">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email'value={credential.email} onChange={onChange} />
  </div>

  <div className="form-group mb-3">
    <label htmlFor="exampleInputLocation">Location</label>
    <input type="text" className="form-control"  placeholder="Enter location " name='location' value={credential.location} onChange={onChange}/>
  </div>

  <div className="form-group mb-3">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password' value={credential.password} onChange={onChange}/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
  <Link to="/login" className=" m-3 btn btn-danger">Already Exist</Link>
</form>
</div>
      </>

  )
}

export default Signup;
