const express = require("express");
const conectdb = require("./config/database")
const loginrouter = require("./routers/userauth");
const profile =require("./routers/profile")
const course =require ("./routers/course")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const {cloudinaryConnect}=require("./config/cloudinary")



const app=express();
app.use(cors({
  origin: "http://localhost:5173",  // frontend URL
  credentials: true                 // if you need cookies/auth headers
}));
app.use(express.json());
app.use(cookieParser())

app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

//config 
cloudinaryConnect();
conectdb();

app.use(express.urlencoded({ extended: true }));
app.use ("/api/auth", loginrouter)
app.use("/api/profile",profile)
app.use("/api/course", course )




app.get("/",(req,res)=>{
    res.status(200).json({
        massage:"everything is good i am app .js",
        success: true,
    })
    
})


app.listen (4000);