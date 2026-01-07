const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim: true
    },
     lastName:{
        type:String,
        required:true,
        trim: true
    },
      password:{
        type:String,
        required:true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        trim: true
    },
    accountType: {
        type:String,
        enum:["Admin","Student","Instructor"],
        required: true,
    },
    additionalDetails:{
        type:mongoose.Schema.ObjectId,
        ref: "profilemodel",
        required :true,
    },

       courses:[{
        type:mongoose.Schema.ObjectId,
        ref:"course",
    }],
      courseprogres:[{
        type:mongoose.Schema.ObjectId,
        ref:"courseprogres",
    }]
})

module.exports= mongoose.model("usermodel",userSchema);