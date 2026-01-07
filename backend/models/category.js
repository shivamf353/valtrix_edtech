const mongoose=require("mongoose")

const categorySchema = new mongoose.Schema({
    name:String,
     discription: String,
    courses:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"coursemodel",
    }
})

module.exports =mongoose.model("categorymodel",categorySchema)