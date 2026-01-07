const moongose = require("mongoose")

const subsectionSchema = new moongose.Schema({

    tital:String,
    discription:String,
    timeduration:String,
    vediourl:String
})

module.exports= moongose.model("subsectionmodel",subsectionSchema);