import React from 'react'
import { usecart, usedispatchCart } from '../components/ContextReducer'
import trash from '../trash.svg'
import {  toast } from 'react-toastify';

function Cart() {
  let data = usecart();
  let dispatch = usedispatchCart();
  if(data.length === 0)
  {
     return (
          <div>
          <h1 className='text-center font-weight-bold'>Cart  🛒</h1>
            <div className='text-center w-100 fs-3 m-5 text-success font-weight-bold '>The Cart is Empty. Please Add the Items 😄</div>
          
          </div>
     )
  }
   const handleCheckout = async ()=>
   {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/orderdata`, 
      {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          order_data:data,
          email: userEmail,
          order_date : new Date().toDateString()
        })
      }
    );
    if(response.status===200)
    {
      await dispatch({type:"DROP"});
      toast.info("Order Successful 🎉");
    }
   }

  let totalPrice = data.reduce((total,food)=>total+food.price,0);

  return (
    <div>
    <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md ' style={{ height: '500px', overflow: 'scroll' }}>
    <h1 className='text-center m-2'>Cart</h1>
    <table className="table table-hover">
  <thead className='text-success fs-4'>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Quantity</th>
      <th scope="col">Option</th>
      <th scope="col">Amount</th>
      <th scope="col"></th>
    
    </tr>
   </thead>
   <tbody>
    {data.map((food,index)=>
    (
      <tr>
        <th scope='row' >{index+1}</th>
        <td>{food.name}</td>
        <td>{food.qty}</td>
        <td>{food.size}</td>
        <td>{food.price}</td>
        <td><button type='button' className='btn p-0' ><img src={trash} alt="delete" onClick={()=>{dispatch({type:"REMOVE",index:index})}}/></button></td>
      </tr>
    )
    )}
   </tbody>
</table>
<div><h1 className='fs-2 text-success'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5' onClick={handleCheckout}> Check Out </button>
        </div>
</div>
    </div>
  )
}

export default Cart;
