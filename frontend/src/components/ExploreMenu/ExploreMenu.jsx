import React from 'react'
import './expMenu.css'
import { menu_list } from '../../assets/assets.js'
const ExploreMenu = ({category,setcategory}) => {
    function handleClick(index){
        console.log(menu_list[index].menu_name);
        setcategory(menu_list[index].menu_name);
    }
    return (
        <div className='explore-menu'>
            <h1>Explore our Menu</h1>
            <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes.</p>
            <div className="explore-menu-list">
                {
                    menu_list.map((item,index)=>{
                        return(
                            <div className={category===item.menu_name?"menu-item active":"menu-item"} key={index} onClick={()=>handleClick(index)}>
                                <img src={item.menu_image}/>
                                <p>{item.menu_name}</p>
                            </div>
                        )
                    })
                }
            </div>   
        </div>
    )
}

export default ExploreMenu
