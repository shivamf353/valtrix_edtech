const moongose = require("mongoose")

const profileSchema = new moongose.Schema({

    gender:String,
    dateofbirth:String,
    about:String,
    contectno:{
        type:Object,
        trim:true
      
    },
    image:String
})

module.exports= moongose.model("profilemodel",profileSchema);