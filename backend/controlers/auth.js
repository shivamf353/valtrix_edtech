const usermodel = require("../models/user-model")
const otpmodel = require("../models/otp")
const profilemodel = require("../models/profile")
const otpgenrator =require ("otp-generator");
const { json } = require("express");
const bcrypt = require("bcrypt")
const jwt= require("jsonwebtoken")
require("dotenv").config


//send otp
exports.sendotp = async(req ,res,next)=>{
    let{email }=req.body;
   try {
     const checkuser =await usermodel.findOne({email})
    if(checkuser){
        console.log("you already have acount")
        return res.status(400).json({
            massage: "user already exist",
            success: false
        })
    }
        //genrate otp and send otp
        const newotp =otpgenrator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        }) ;
        
      // check wather the otp uniqe or not
        let result= await otpmodel.findOne({otp:newotp})
        while(result){
             newotp =otpgenrator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        }) ;
        result = await otpmodel.findOne({otp:newotp})
        }

 console.log(newotp);

        //add otp to database
      const otp=await otpmodel.create({
             useremail:email,
             otp :newotp
        })
        console.log("your otp model is -", otp);
        res.status(200).json({
            success: true,
            massage:"otp sent to database"
        })

   } catch (error) {
    res.status(400).json({
        success:false,
        massage: "otp not sent",error
    })
    
   }
}



//signup code

exports.signup=async(req,res)=>{

    let {email,firstName,lastName,password,confirmPassword,accountType, otp }=req.body;  
    try {
            //validations
        if(!email || !firstName || !lastName || !password ||!confirmPassword ||!otp){
           return res.status(400).json({
                message: "All fields are required",
                success:false
            })
        }
        console.log("validation done")

        let user =await usermodel.findOne({email})
        if(user){
            return res.status(400).json({
                message:"User already exists",
                success:false
            })
        } 
        
         console.log("user existance check")

    const recentOtp = await otpmodel.findOne({ useremail: email }).sort({ createdAt: -1 });
if (!recentOtp || recentOtp.otp !== otp) {
  return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
}

    
    console.log("✅ OTP verification done");

    //hass password
    const hashedPassword = await bcrypt.hash(password,10)
    console.log("hashing done")
    console.log(hashedPassword)
    const profile= await profilemodel.create({
        gender:null,
        dateOfBirth:null,
        about:null,
        contactNumber:null,
        image:null,
    })
     console.log("profile check" , profile)

     console.log("➡️ Before creating user:", {
  firstName,
  lastName,
  email,
  accountType,
  hashedPassword,
  profileId: profile._id,
});

    const newuser = await usermodel.create({
        firstName,
        lastName,
        password: hashedPassword,
        email,
        accountType,
        additionalDetails: profile._id
    })

     console.log("new user created")

    res.status(200).json({
        success:true,
        massage:"new user created",
        newuser
    })

     console.log("responce send")
        
}
 catch (error) {
         res.status(400).json({
        success:false,
        massage: "user not signup"
    })
    }

}




/// login page 

exports.login= async (req,res)=>{
    const {email,password}=req.body;
    try {
        const user= await usermodel.findOne({email}).populate("additionalDetails").exec();
        console.log("backend login called")
        if(!user){
            console.log("no user found plese login")
            return res.status(400).json({
                massage:"no user found ",
                success:false
            })
        }
        const result = await bcrypt.compare(password,user.password)
        if(!result){
            return res.status(400).json({
                massage:"no user found ",
                success:false
                })
            }

        let payloade={
            email:user.email,
            id:user.id,
            acounttype:user.accountType
            }
        let token = jwt.sign(payloade, process.env.JWT_KEY)

         // Set cookie for token and return success response

            res.cookie("token", token, {
            httpOnly: true,
            secure: false,        // MUST be false on localhost
            sameSite: "lax",      // REQUIRED for localhost cross-origin
            maxAge:  24 * 60 * 60 * 1000,
            });
           
            return res.status(200).json({
            success: true,
            message: "User login success",
            user,
            token
            })
            
    } catch (error) {
            res.status(500).json({
                message:"somting waint wrong , login again"
            })
    }
    

   
}




//change password

exports.changepassword=async (req,res) => {
    const {oldpassword,newpassword}= req.body;
try {
     //find  the user 
    const user= await usermodel.findById(req.user.id)

    //compare the password
    const result = await bcrypt.compare(oldpassword , user.password)
    console.log(result);
    console.log(user);
    
    
    if(!result){
        return res.status(400).json({
            message:"incorect password",
            success:false
        })
    } 
    //hash and save the password
    const hashpassoword= await bcrypt.hash(newpassword,10)
    user.password=hashpassoword;
    await user.save()
    console.log(user);
    
    res.status(200).json({
            message:"your password changes succesfuly",
            success:true
        })
   } catch (error) {
     res.status(500).json({
            message:"password not change try again",
            success:false
        })
   }
}



//