const moongose = require("mongoose")

const courseprogresSchema = new moongose.Schema({

    courceId: {
        type:moongose.Schema.Types.ObjectId,
        ref:"cource"
    },
    compleatedvedio:{
         type:moongose.Schema.Types.ObjectId,
        ref:"subsection"
    }

})

module.exports= moongose.model("courseprogresmodel",courseprogresSchema);