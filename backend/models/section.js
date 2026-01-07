const moongose = require("mongoose")

const sectionSchema = new moongose.Schema({

    sectionname:String,
    
    subsection:[
        {
            type:moongose.Schema.Types.ObjectId,
            trim:true,
            ref:"subsectionmodel"
        }
    ]
})

module.exports= moongose.model("sectionmodel",sectionSchema);