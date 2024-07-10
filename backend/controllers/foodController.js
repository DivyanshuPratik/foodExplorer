import { error, log } from "console";
import foodModel from "../models/foodModel.js";
import fs from 'fs';

// add food item

const addFood = async(req,res)=>{
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name:req.body.name,
        desc:req.body.desc,
        price:req.body.price,
        category:req.body.category,
        Image:image_filename
    })
    try {
        await food.save();
        res.json({success:true,message:"food added"})
    } catch (error) {   
        console.log(error)
        res.json({success:false,message:error})
    }
} 
//all food list

const listFood = async(req,res)=>{
    try{
        const foods = await foodModel.find({});
        res.json({success:true,data:foods});
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error});
    }
}

//remove food items 

const removeItem = async(req,res)=>{
    try{    
        console.log(req.body);
        const food = await foodModel.findById(req.body.id);
        console.log(food);
        fs.unlink(`uploads/${food.Image}`,()=>{});
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"food removed successfully"});
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error});
    }
}

export default { addFood,listFood,removeItem};