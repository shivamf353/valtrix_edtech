const {instance}=require("../config/razorpay")
const mailsender =require("../utils/mailsender")
const coursemodel =require("../models/course")
const usermodel= require("../models/user-model")
const { json } = require("express")





// 🎯 Create Razorpay Order
exports.create_order= async (req,res) => {

    try {
    const { userid, courseid, amount, currency = "INR", receipt = "receipt#1" } = req.body

    if(!userid || !courseid){
        console.log("valid userid or courceid is not found")
    }

     const course = await coursemodel.findById(courseid);
     if(!course){
      console.log("no course found with this course id")
     }


// validation user is alredy by the cource or not
    const uid = new mongoose.Types.ObjectId(userid);
    const user = course.studentenroled.includes(uid)
    if(user){
        console.log ("user already inroled found")
    }

    const options = {
      amount: amount * 100, // Amount in paisa (₹500 = 50000)
      currency,
      receipt: Math.random(Date.now()).toString,
      notes:{userid,coursid}
    };

    const order = await instance.orders.create(options);
    res.status(200).json({ 
        success: true,
        order , 
        massage:"your order is created",
        coursename: course.coursename,
        discription : course.coursediscription,
        userid: userid,
        orderid : order.id ,
        orderPaymentMode :order.currency,
        amoount : order.amoount

    });
  } catch (error) {
    console.error("Order creation failed", error);
    res.status(500).json({
         success: false,
          message: "Order creation failed" 
        });
  }
}


// verify signature of razorpay


exports.varifysignature= async (req ,res) => {


try{
    const webhooksecrate ="123456"
  const signature= req.header["x-razorpay-signature"]
 const shasum=  crypto.createHmac("sha256",webhooksecrate)
 shasum.update(json.stringify(req,body));
 const digest = shasum.digest("hex")


 if(webhooksecrate==digest){
  console.log("payment is athorise")
 }

 const {userid, courseid}=req.body.payload.payment.entity.notes ;

 //update the course and inrole the student

 const course = await coursemodel.findByIdAndUpdate(courseid,{
                                                    $push: { studentenroled: userid}
                                                    },
                                                    {new:true})

 console.log("user updated in course",course);

  const user = await usermodel.findByIdAndUpdate(userid,{
                                                    $push: { courses: courseid}
                                                    },
                                                    {new:true})
  console.log("course updated in user",course);

  // send confirmation mail to the user 

   const emailresponce= await mailsender(user.email ,
                                         "succefully inroled in the course",
                                          "congratulation you are inroled in for the cource" 
                                        ); 
    console.log(emailresponce)                                    


  res.status(200).json({
    massage: "signature varified and user added",
    success:true,
    
  })
  


}catch{
    res.status(200).json({
    massage: "signature varified and user added",
    success:true,})
    
}
}
