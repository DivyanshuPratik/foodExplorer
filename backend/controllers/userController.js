import UserModel from "../models/users.js";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import validator from "validator";

const saltRounds = 10;
//Login
 
const LoginUser = async(req,res)=>{
    const {email,password} = req.body;
    if (!validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: "Invalid email format" });
    }
    try{
        const user = await UserModel.findOne({email:email});
        if(!user){
            return res.status(404).json({success:false,message:"User Not Found"});        
        }
        const match = await bcrypt.compare(password,user.password)
        if(match){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"2h"});
            return res.json({success:true,message:"successfully logged in",token:token});
        }
        else{
            return res.status(401).json({success:false,message:"unauthorized"});
        }        
    }
    catch(error){
        return res.status(500).json({success:false,message:error});
    }


}

const RegisterUser = async(req,res)=>{
    console.log("hitting");
    try {    
        const {name,email,password} = req.body;
        if (!validator.isEmail(email)) {
            return res.status(400).json({success:false, message:"Invalid email format" });
        }
        const user = await UserModel.findOne({email:email});
        if(user){
            return res.status(401).json({success:false,message:"user already exists"});
        }
        if(password.length<6){
            return res.status(408).json({success:false,message:"Password Should be of length greater than 6"});
        }
        const hash = await bcrypt.hash(password, saltRounds) 
        const newUser = new UserModel({
            name:name,
            email:email,
            password:hash,
        })
        await newUser.save();
        return res.status(200).json({success:true,message:"User registered successfully"});
    } catch (error) {
        return res.status(223).json({success:false,message:error});
    }
   
    
}

export default {LoginUser,RegisterUser};