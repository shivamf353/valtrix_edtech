const express= require("express")
const router= express.Router();

const{updateprofile,deleteaccount,getuserdetials,updateDisplayPicture}=require("../controlers/profile")
const{auth}=require("../midelware/auth")

router.put("/updateProfile",auth,updateprofile)
router.put("/updateDisplayPicture",auth,updateDisplayPicture)
router.delete("/accountdelete",auth,deleteaccount)
router.get("/getUserDetails",auth, getuserdetials)

module.exports=router