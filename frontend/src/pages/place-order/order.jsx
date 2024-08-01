import React, { useContext, useEffect, useState } from 'react'
import './order.css'
import { StoreContext } from '../../context/storeContext'
import axios from 'axios'
const Order = () => {
  const {getTotalCartAmount,token,food_list,cartItems} = useContext(StoreContext)
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",
  })
  const handleChange = (e)=>{
    setData((prev)=>({...prev,[e.target.name]:e.target.value}))
  }
  const placeOrder = async(e)=>{
    e.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }
    console.log(orderData)
    const headerToken = "Bearer "+token
    console.log(headerToken);
    let response = await axios.post("http://localhost:3000/api/order/place",orderData,{
      headers:{Authorization:"Bearer "+token}
    })
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("error");
    }
    
  }
  return (
    <form className='place-order' onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multifields">
          <input required type="text" placeholder='First Name' name="firstName" onChange={handleChange}/>
          <input required type="text" placeholder='Last Name' name="lastName" onChange={handleChange}/>
        </div>
        <input required type="email" placeholder='Email Address' name='email' onChange={handleChange}/>
        <input required type="text" placeholder='Street' name='street' onChange={handleChange}/>
        <div className="multifields">
          <input required type="text" placeholder='City' name='city' onChange={handleChange}/>
          <input required type="text" placeholder='State' name='state' onChange={handleChange}/>
        </div>
        <div className="multifields">
          <input required type="text" placeholder='Zip code' name='zipcode' onChange={handleChange}/>
          <input required type="text" placeholder='Country' name='country' onChange={handleChange}/>
        </div>
        <input required type="text" placeholder='Phone Number' name='phone' onChange={handleChange}/>
      </div>
      <div className="place-order-right">
        <div className="cart-totals">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>{getTotalCartAmount()}$</p>
              </div>
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>{getTotalCartAmount()===0?0:2}$</p>
              </div>
              <div className="cart-total-details">
                <p>Total</p>
                <p>{getTotalCartAmount()+(getTotalCartAmount()===0?0:2)}$</p>
              </div>
              
            </div>
            <button className='payup' type='submit'>
                Proceed To Payment
            </button>
        </div>
      </div>
    </form>
  )
}

export default Order
