import jwt from "jsonwebtoken"

const authMiddleware = async(req,res,next)=>{
    console.log(req.headers);
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({success:false,message:"User Not Authorized"});
    }
    if(token.split(" ")[0]!='Bearer'){
        return res.status(401).json({success:false,message:"User Not Authorized"});
    }
    try{
        const tokenVal = token.split(" ")[1];
        const tokenDecode = jwt.verify(tokenVal,process.env.JWT_SECRET_KEY);
        req.body.userId = tokenDecode.id;  
        console.log(req.body);      
        next();
    }
    catch(error){
        console.log(error);
        return res.status(401).json({success:false,message:"User Not Authorized"});
    }
}
export default authMiddleware;