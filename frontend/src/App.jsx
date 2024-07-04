import React, { useState } from 'react'
import Navbar from './components/navbar/navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/home'
import Cart from './pages/cart/cart'
import Order from './pages/place-order/order'
import Footer from './components/Footer/Footer'
import Login from './components/LoginPopup/Login'
const App = () => {
  const[showLogin,setShowLogin] = useState(false);
  return (
    <>
    {showLogin?<Login setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/order' element={<Order/>}></Route>
      </Routes>
    </div>  
    <Footer/> 
    </>

  )
}

export default App
