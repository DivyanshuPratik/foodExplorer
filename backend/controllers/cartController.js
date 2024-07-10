import UserModel from "../models/users.js";

const addToCart = async(req,res)=>{
    try {
        const userData = await UserModel.findOne({_id:req.body.userId});
        const cartData = await userData.cartData;
        if(!req.body.itemId){
            return res.json({success:false,message:"missing itemId in body"})
        }
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] ++;
        }
        await UserModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"successfully added to cart"});
    } catch (error) {
        res.json({success:false,message:error});
    }
}

const deleteFromCart = async(req,res)=>{
    try {
        const userData = await UserModel.findById(req.body.userId);
        const cartData = await userData.cartData;
        if(!req.body.itemId){
            return res.json({success:false,message:"missing itemId in body"})
        }
        if(cartData[req.body.itemId]==1){
            delete cartData[req.body.itemId];
        }
        else{
            cartData[req.body.itemId]--;
        }
        await UserModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"item removed successfully"})
    } catch (error) {
        res.json({success:false,message:error});
    }
}

const getCartItems = async(req,res)=>{
    const userData = await UserModel.findById(req.body.userId);
    const cartData = userData.cartData;
    res.json({success:true,data:cartData});
}

export default {addToCart,deleteFromCart,getCartItems};