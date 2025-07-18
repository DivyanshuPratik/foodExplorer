import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/storeContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
const MyOrders = () => {
    const { token } = useContext(StoreContext)
    const [data, setData] = useState([]);
    const fetchOrders = async () => {
        const response = await axios.get("https://foodexplorer-b7zr.onrender.com/api/order/userOrders", {
            headers: { Authorization: `Bearer ${token}` }
        })
        setData(response.data.data);
    }
    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token])
    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className='container'>
                {
                    //data is array of objects
                    data.filter((order) =>
                        order.payment === true
                    ).map((order, orderIndex) => {
                        return (
                            <div key={orderIndex} className='my-orders-order'>
                                <img src={assets.parcel_icon} alt="" />
                                <p>{order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return item.name + " x " + item.quantity
                                    } else {
                                        return item.name + " x " + item.quantity + ", "
                                    }
                                })}</p>
                                <p>{order.amount}$</p>
                                <p>Items:{order.items.length}</p>
                                <p><span>&#x25cf;</span><b>{order.status}</b></p>
                                <button>Track Order</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MyOrders
