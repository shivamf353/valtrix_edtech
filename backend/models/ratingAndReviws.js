const moongose = require("mongoose")

const ratingAndReviwsSchema = new moongose.Schema({

  user:{
         type:moongose.Schema.Types.ObjectId,
         trim:true,
         ref:"usermodel"
        },
  course:{
         type:moongose.Schema.Types.ObjectId,
         trim:true,
         ref:"coursemodel"
        },
  rating:String,
  review:String,

})

module.exports= moongose.model("ratingAndReviwsmodel",ratingAndReviwsSchema);