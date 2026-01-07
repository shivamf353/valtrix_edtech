
const mongoose =require("mongoose")
require("dotenv").config();


const conectdb =async()=>{
try {
    await mongoose.connect(process.env.mongodb_url);
    console.log("database is conected")
} catch (error) {
    console.log("database is conection failed")
    
}
}
 
module.exports=conectdb;