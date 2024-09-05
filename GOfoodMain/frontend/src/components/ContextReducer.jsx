import React, { createContext, useReducer } from 'react'
import { useContext } from 'react';
const CartState = createContext();
const CartdispatchContext = createContext();

const reducer =(state,action)=>
{
    switch (action.type) {
      case "ADD":
        return [...state,{id: action.id , name: action.name , qty: action.qty, size: action.size, price: action.price, img:action.img}]
        break;
      case"REMOVE":
            let newArr =[...state]
            newArr.splice(action.index,1)
            return newArr;
      case "UPDATE":
          return state.map((food) => {
            if (food.id === action.id) {
            console.log(food.qty, parseInt(action.qty), action.price, food.price);
          return {
              ...food,
              qty: parseInt(action.qty) + food.qty,
              price: action.price + food.price,
                 };
               }
           return food;
           });

           case "DROP":
            return [];
        
 
      default:
        console.log("Error in Reducer");
        break;
    }
}

export const CartProvider = ({children})=> {
    
    const[state,dispatch] = useReducer(reducer,[]);
    return(
       <CartdispatchContext.Provider value={dispatch}>
       <CartState.Provider value={state}>
        {children}
       </CartState.Provider>
      </CartdispatchContext.Provider>
    )
}

export const usecart =()=> useContext(CartState);
export const usedispatchCart =()=> useContext(CartdispatchContext);


