import React, { useContext, useState } from 'react';
import './navbar.css';
import { assets } from '../../assets/assets';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/storeContext';
const Navbar = ({setShowLogin}) => {
    const {token,setToken} = useContext(StoreContext)
    const [menu,setMenu] = useState("home");
    const [items,setItems] = useState(0);
    function handleClick(){
        setItems(i=>i+1);
    }
    const LogoutUser = ()=>{
        setToken(null);
        localStorage.removeItem("token");
        Navigate(to="/");
    }
    const navigate = useNavigate();
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
            {token
            ?<div className="navbar-profile">
                <img src={assets.profile_icon} alt="" />
                <ul className='nav-profile-dropdown'>
                    <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" onClick={()=>navigate('/myorders')}/><p>Orders</p></li>
                    <hr />
                    <li onClick={LogoutUser}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>                    
                </ul>

            </div>
            :<button className='signIn' onClick={()=>setShowLogin(true)}>sign in</button>}
        </div>
    </div>
    )
}

export default Navbar;
