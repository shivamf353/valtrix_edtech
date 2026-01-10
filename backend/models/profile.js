const moongose = require("mongoose")

const profileSchema = new moongose.Schema({

    gender:String,
    dateOfBirth:Date,
    about:String,
    contactNumber: [{
        type: String,
        trim: true,
        minlength: 10,
        maxlength: 12,
    }],
    image:String
})

module.exports= moongose.model("profilemodel",profileSchema);