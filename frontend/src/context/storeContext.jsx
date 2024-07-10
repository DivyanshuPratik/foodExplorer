import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
export const StoreContext = createContext({});
import axios from 'axios';
const StoreContextProvider = (props) => {

    const [food_list,setFoodList] = useState([])
    const [cartItems,setCartItems] = useState({});
    const [token,setToken] = useState(null);

    const addToCart = async(itemId) =>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}));
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:cartItems[itemId]+1}));
        }
        if(token){
            const response = await axios.post("http://localhost:3000/api/cart/add",{itemId:itemId},{headers:{Authorization:"Bearer "+token}});
            console.log(response);
        }
    }
    const removeFromCart = async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            const response = await axios.post("http://localhost:3000/api/cart/remove",{itemId:itemId},{headers:{Authorization:"Bearer "+token}});
            console.log(response);
        }
    }
    const getCartItems = async(token)=>{
        if(token){
            const response = await axios.get("http://localhost:3000/api/cart/getItems",{headers:{Authorization:"Bearer "+token}})
            console.log(response.data.data);
            setCartItems(response.data.data);
        }
    }
    const getTotalCartAmount = ()=>{
        let amt = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
            let itemInfo = food_list.find((product)=>product._id===item);
            amt+=itemInfo.price*cartItems[item];
            }
        }
        return amt;
    }
    useEffect(()=>{
        if(localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));
            getCartItems(localStorage.getItem('token'));
        }
    },[])
    const contextValue = {
        food_list,
        setFoodList,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;