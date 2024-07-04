import React, { useState } from 'react';
import './navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
const Navbar = ({setShowLogin}) => {
    const [menu,setMenu] = useState("home");
    const [items,setItems] = useState(0);
    function handleClick(){
        setItems(i=>i+1);
    }
    return (
    <div className='navbar'>
        <Link to='/'><img src={assets.logo} alt="logo" className='logo'/></Link>
        <ul className='appbar-menu'>
            <li onClick={()=>{setMenu("home")}} className={(menu==="home")?"active":""}>home</li>
            <li onClick={()=>{setMenu("menu")}} className={(menu==="menu")?"active":""}>menu</li>
            <li onClick={()=>{setMenu("mobile-app")}}className={(menu==="mobile-app")?"active":""}>mobile app</li>
            <li onClick={()=>{setMenu("contact-us")}}className={(menu==="contact-us")?"active":""}>contact us</li>
        </ul>
        <div className='icon-container'>
            <img src={assets.search_icon} alt="search-icon" className='search-logo'/>
            <Link to='/cart'><div style={{position:'relative',top:"10px"}}>
                <img src={assets.basket_icon} alt="basket-icon" className='cart-logo'/> 
                <div className='cart-count'></div>           
            </div></Link>
            <button className='signIn' onClick={()=>setShowLogin(true)}>sign in</button>
        </div>
    </div>
    )
}

export default Navbar;
