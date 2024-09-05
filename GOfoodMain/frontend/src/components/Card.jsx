import React, { useEffect, useRef, useState } from 'react'
import { usecart, usedispatchCart } from './ContextReducer';

export default function Card(props) {
  let dispatch = usedispatchCart();
  let data = usecart();
  const Totalref =useRef();
  let options = props.options;
  let priceoptions = Object.keys(options); 

   const [qty,setQty]=useState(1);
   const [size,setSize]= useState("");



   const handleAddToCart= async()=>
   {
    let food =[]
    for(const item of data)
    {
      if(item.id=== props.fooditem._id)
      {
        food=item;
        break;
      }
    }
    if(food!=[])
    {
      if(food.size ===size)
      {
        await dispatch({type:"UPDATE",id: props.fooditem._id ,price: TotalPrice,qty:qty , size:size})
        return
      }
      else if(food.size !==size)
      {
        await dispatch({type:"ADD", id:props.fooditem._id , name:props.fooditem.name , price:TotalPrice, qty:qty , size:size});
        return
      }
      return
      //await console.log(data); 
    }
    await dispatch({type:"ADD", id:props.fooditem._id , name:props.fooditem.name , price:TotalPrice, qty:qty , size:size});
      
   }
    

   let  TotalPrice = qty * parseInt(options[size]);
   
   useEffect(()=>{ setSize(Totalref.current.value)}  ,[]);
 
   return (
    <>
      <div className='container'>
        <div className="card mt-3 p-99" >
  <img src={props.fooditem.img} className="card-img-top" alt="image" style={{height:"120px",objectFit:"fill"}}/>
  <div className="card-body">
    <h5 className="card-title">{props.fooditem.name}</h5>
    <p className="card-text">{props.des}</p>
    <div className='container w-100'>
      <select className='m-1 rounded h-100  bg-danger text-white ' onChange={(e)=> setQty(e.target.value)}>
        {Array.from(Array(6),(e,i)=>{
          return(
            <option key={i+1} value={i+1}>{i+1}</option>
          )
        })}
      </select>

      <select className='m-1 rounded h-100 bg-danger text-white ' ref={Totalref} onChange={(e)=> setSize(e.target.value)}>
          
          {priceoptions.map((data)=>{
            return <option key={data} value={data}>{data}</option>
          })}
      </select>

      <div className='d-inline h-100 fs-5'>
        {TotalPrice}/-
      </div>
    </div>
    <hr />
    <button className='btn bg-success text-white justify-center ms-2' onClick={handleAddToCart}>Add to Cart</button>
  </div>
</div>
</div>
    </>
  )
}
