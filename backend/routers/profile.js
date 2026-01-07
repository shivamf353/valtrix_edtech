const express= require("express")
const router= express.Router();

const{updateprofile,deleteaccount,getuserdetials}=require("../controlers/profile")
const{auth}=require("../midelware/auth")

router.put("/profileupdate",auth,updateprofile)
router.delete("/accountdelete",auth,deleteaccount)
router.get("/getUserDetails",auth, getuserdetials)

module.exports=router