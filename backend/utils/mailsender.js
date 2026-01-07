const nodemailer =require("nodemailer")


const mailsender =async (email,title,body)=>{
  console.log(email,title,body)

try {
  
  let transporter = nodemailer.createTransport({
    host:process.env.mail_service,
    port: 587,                         // ✅ Required for Gmail
    secure: false, 
    auth:{
        user:process.env.host_mail,
        pass: process.env.host_pass
    }
  })

  let info = await transporter.sendMail({
    from:"stream by shivam gupta",
    to :`${email}`,
    subject:`${title}`,
    html:`${body}`
  })
  return info;
}
catch (error) {
    console.log("mailsender not work" , error.message)
}
}
module.exports= mailsender;