const express=require("express")
const router =express.Router();
const usermodel=require("../models/user-model")
const coursemodel=require("../models/course")

const {sendotp,signup,login,changepassword}=require("../controlers/auth")
const{auth,isadmin,isstudent,isteacher}=require("../midelware/auth")


router.post("/sendotp", sendotp)
router.post("/signup",signup)
router.post("/login", login)
router.post("/changepassword",auth,changepassword)

// i have to work on this routes and controlers

// router.post("/reset-password-token", resetPasswordToken)
// router.post("/reset-password", resetPassword)



module.exports = router;