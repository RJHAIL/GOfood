import React from 'react'
import Home from './screeen/Home'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './screeen/Login';
import Signup from './screeen/Signup';
import { CartProvider } from './components/ContextReducer';
import Myorder from './screeen/Myorder';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'


function App() {
  return (
    <CartProvider>
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/createuser' element={<Signup/>}/>
      <Route path='/myorders' element={<Myorder/>}/>
     </Routes>
    </BrowserRouter>
    <ToastContainer 
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
   draggable
   pauseOnHover
   theme="colored"
   transition: Bounce />
    </CartProvider>
  )
}

export default App
