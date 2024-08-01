import { response } from "express";
import orderModel from "../models/orderModel.js";
import UserModel from "../models/users.js"; 
import  { Stripe } from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
//placing user order from frontend
const placeOrder = async(req,res)=>{
    console.log(req.body);
    const frontend_url = "http://localhost:5173"
    try {
        const newOrder = new orderModel({
            userId:req.body.userId ,//from middleware
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();
        await UserModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"usd",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity
        }))
        line_items.push ({
            price_data:{
                currency:"usd",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100
            },
            quantity:1
        })
        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })
        res.json({success:true,session_url:session.url});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
    }
}
const verifyOrder = async(req,res)=>{
    const {orderId,success} = req.body;
    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{
                payment:true
            })
            res.json({success:true,message:"paid successfully"});
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"payment failed"})
        }
    } catch (error) {
        console.log(error);  
        res.json({success:false,message:error})      
    }
}

const userOrders = async(req,res)=>{
    try {
        //orders from user id
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders});
    } catch (error) {
        res.json({success:false,message:error})
    }
}

const listOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({})
        res.json({success:true,data:orders})
    } catch (error) {
        res.json({success:false,message:error})
    }
}
const setStatus = async(req,res)=>{
    console.log(req.body);
    try {
        await orderModel.findByIdAndUpdate(req.body.userId,{status:req.body.status})
        res.json({success:true,message:"Status updated"})
    } catch (error) {
        res.json({success:false,message:error})
        
    }
}
export default {placeOrder,verifyOrder,userOrders,listOrders,setStatus}