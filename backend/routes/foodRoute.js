import express from 'express';
import foodController from '../controllers/foodController.js';
import multer from 'multer';
// console.log(foodController);
const foodRouter = express.Router();

//image storage engine 

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})
const upload = multer({storage:storage});

foodRouter.post("/add",upload.single("image"),foodController.addFood);
foodRouter.get('/list',foodController.listFood)
foodRouter.delete('/remove',foodController.removeItem);
export default foodRouter;