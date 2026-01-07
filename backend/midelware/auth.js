const jwt = require("jsonwebtoken")
require("dotenv").config


exports.auth=(req,res,next)=>{
   try {
     //find token
    const token = req.cookies.token
   
    if(!token){
       return res.status(400).json({
        message:"login first",
        success:false
       })
    }
    const decode = jwt.verify(token,process.env.JWT_KEY)
    req.user=decode
    console.log(" backend auth worked fine ")
    next();
    
   } catch (error) {
       return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });

    
   }
} 


// is student 

exports.isstudent=(req,res, next)=>{
   try {
     if(req.user.accounttype !== "student"){
        res.status(299).json({
            massage:"protected routes for student only",
            success:false
        })
        next()
    }
   } catch (error) {
     res.status(299).json({
            massage:"error in acount type",error,
            success:false
        })
   }
}



//is admin


exports.isadmin=(req,res, next)=>{
   try {
     if(req.user.accounttype !== "admin"){
        res.status(299).json({
            massage:"protected routes for admin only",
            success:false
        })
        next()
    }
   } catch (error) {
     res.status(299).json({
            massage:"error in acount type",error,
            success:false
        })
   }
}


//is teacher

exports.isteacher=(req,res, next)=>{
   try {
     if(req.user.accounttype !== "teacher"){
        res.status(299).json({
            massage:"protected routes for teacher only",
            success:false
        })
        next()
    }
   } catch (error) {
     res.status(299).json({
            massage:"error in acount type",error,
            success:false
        })
   }
}