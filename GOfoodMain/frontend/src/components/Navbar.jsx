import React, { useState } from 'react'
import {Link,useNavigate} from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screeen/Cart'
import { usecart, usedispatchCart } from '../components/ContextReducer'

export default function Navbar() {
  let data = usecart();
  const [CartView,setCartView] = useState(false);
  const navigate = useNavigate();
     
  const  handlelogout =()=>
  {
    localStorage.removeItem("authToken");
    navigate('/login');
  }


  return (
    <>
      <nav className="navbar navbar-expand-lg light bg-success">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic text-white" to="/">GoFood</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2">
        <li className="nav-item">
          <Link className="nav-link active text-white active fs-5" aria-current="page" to="/">Home</Link>
        </li>
        {
          localStorage.getItem("authToken") ? (  <li className="nav-item">
          <Link className="nav-link active text-white active fs-5" aria-current="page" to="/myorders">My Orders</Link>
        </li>):""
        }
      </ul>
      

        {
          localStorage.getItem("authToken") ? ( 
            <div>
            <div className='btn bg-white text-success mx-3' onClick={()=>{setCartView(true)}}>
            My Cart {" "}
            {data && data.length > 0 ? <Badge bg="danger">{data.length}</Badge> : null}
            
            </div>
            {CartView ? <Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
            <div className='btn bg-white text-danger mx-3'onClick={handlelogout}>
            Logout
            </div>
            </div>
            
            )
            :
            (<div className='d-flex'>
              <Link className="btn bg-white text-danger mx-3" to="/login">Login</Link>
             <Link className="btn bg-white text-danger mx-3" to="/createuser">SignUp</Link>
              </div>)
        }


         
        
    </div>
  </div>
</nav>
    </>
  )
}
