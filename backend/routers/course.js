const express= require("express")
const router= express.Router();



const{showallcategory ,createcategory,categorypagedetials}=require("../controlers/category")


router.get("/showallcategry", showallcategory)
router.post("/createCategory",  createcategory)
router.post("/getCategoryPageDetails", categorypagedetials)


module.exports=router