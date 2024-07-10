import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import {toast,ToastContainer} from "react-toastify";
import { assets } from '../../assets/assets';
const List = () => {

    const [dishList,setList] = useState([]);

    const getDishes = async()=>{
        try {
            const response = await axios.get('http://localhost:3000/api/food/list');
            console.log(response.data.data);
            if(response.data.success){
                setList(response.data.data);
            }
            
            
        } catch (error) {
            toast.error(error);
            console.log(error);  
        }
    }
    const deleteItem = async(idx)=>{
        const item = dishList[idx];
        try {
            const obj = {
                id:item._id,
            }
            const response = await axios.delete("http://localhost:3000/api/food/remove",{data:obj});
            console.log(response);
            if(response.data.success){
                toast.success("item delete successfully",{
                    position:'top-right',
                });
                getDishes();
            }
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        getDishes();
    },[])
    return (
        <div className='list add flex-col'>
            <ToastContainer/>
            <p>All Foods List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Actions</b>
                </div>
                {
                    dishList.map((item,index)=>{
                        return (
                            <div key={index} className="list-table-format">
                                
                                <img style={{"height":"80px"}}src={`http://localhost:3000/images/${item.Image}`} alt="" />
                                <p>{item.name}</p>
                                <p>{item.category}</p>
                                <p>${item.price}</p>
                                <p onClick={()=>deleteItem(index)}>X</p>

                            </div>
                        )
                    })            
                }
            </div>
            
        </div>
    )
}

export default List
