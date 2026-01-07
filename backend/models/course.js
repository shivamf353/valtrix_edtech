const moongose = require("mongoose");
const category = require("./category");

const courseShema= new moongose.Schema({

    coursename:String,
    coursediscription:String,
    price:Number,
    thumbnail:String,
    teacher:{
        type:moongose.Schema.Types.ObjectId,
        ref:"usermodel",
        required: true
    },

    whattolearn:{
        type:String,
    },
    coursecontent:[
        {
           type:moongose.Schema.Types.ObjectId,
           ref:"sectionmodel",
           required: true
        }
    ],

    tag:String,
    category:{
        type:moongose.Schema.Types.ObjectId,
        ref:"categorymodel",
    },

    ratingAndReviws:{
        type:moongose.Schema.Types.ObjectId,
        ref:"ratingAndReviwsmodel",
    },
    studentenroled:{
        type:moongose.Schema.Types.ObjectId,
        ref:"usermodel",
    },


})

module.exports= moongose.model("coursemodel",courseShema);