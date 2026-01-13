const moongose = require("mongoose");


const courseShema= new moongose.Schema({

    courseName:String,
    courseDescription:String,
    price:Number,
    thumbnail:String,
    teacher:{
        type:moongose.Schema.Types.ObjectId,
        ref:"usermodel",
        required: true
    },

    whatYouWillLearn:{
        type:String,
    },
    coursecontent:[
        {
           type:moongose.Schema.Types.ObjectId,
           ref:"sectionmodel",
           required: true
        }
    ],

    category:{
        type:moongose.Schema.Types.ObjectId,
        ref:"categorymodel",
    },

    ratingAndReviws:[{
        type:moongose.Schema.Types.ObjectId,
        ref:"ratingAndReviwsmodel",
    }],
    studentenroled:[
        {
        type:moongose.Schema.Types.ObjectId,
        ref:"usermodel",
        }
    ],


})

module.exports= moongose.model("coursemodel",courseShema);