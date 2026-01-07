const mongoose=require("mongoose");
const mailsender = require("../utils/mailsender");
const genratetemp = require("../templets/otp-template")

const otpSchema = new mongoose.Schema({
    useremail :String,
    otp:String,
    createdAt:{
     type:Date,
     default:Date.now,
     expires:5*60
    }
});

async function sendverification(email, otp){
    try {
        const emailbody=genratetemp(otp)
        //mailsender is a utill function
        const mailresponce= await mailsender(email, "stream send varification code for login", emailbody)
        console.log("otp send sucssesfuly",mailresponce)
    } catch (error) {
        console.log ("failed in sending otp",error)
        throw error;
    }
}


otpSchema.pre("save" ,async function (next){
   await sendverification(this. useremail, this.otp);
   next();
})



module.exports=mongoose.model("otpmodel",otpSchema);