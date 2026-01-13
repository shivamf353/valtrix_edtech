const express= require("express")
const router= express.Router();


const{createCourse} = require ("../controlers/course")
const{auth,isteacher, isadmin}=require ("../midelware/auth")
const{showallcategory ,createcategory,categorypagedetials}=require("../controlers/category")



router.post("/createCourse", auth, isteacher, createCourse)


router.get("/showAllCategories", showallcategory)
router.post("/createCategory",auth,isteacher, createcategory)
router.post("/getCategoryPageDetails", categorypagedetials)


module.exports=router