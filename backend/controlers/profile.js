
//method--1
   // we already created the profile model while creating the user with null 
   //show we have to update existin data of the user profile

// method -2
  // we can also create the profile data and insert its id in user both are good .
  //
const usermodel = require("../models/user-model")
const profilemodel = require("../models/profile")
const {uploadImageToCloudinary} = require("../utils/uploder")




  exports.updateprofile= async (req,res) => { 
    try { 
        const{firstName,
            lastName,
            dateOfBirth,
            gender,
            contactNumber,
            about}= req.body

        const userid= req.user.id;
        const userditial = await usermodel.findByIdAndUpdate(userid, ({
            firstName,lastName
        }))
        const profileid = userditial.additionalDetails;
        const profiledetials = await profilemodel.findById(profileid);

        //update profile
        profiledetials.dateOfBirth = dateOfBirth;
        profiledetials.gender=gender
        profiledetials.about=about
        profiledetials.contactNumber=contactNumber
        await profiledetials.save();


        const updateduser= await usermodel.findById(userid).populate("additionalDetails").exec()
        updateduser.password="_";
        

        
        res.status(200).json({
                message:"profile updated",
                success: true,
                updateduser
               
        })
     } catch (error) {
        res.status(500).json({
            message:"profile not updated",
            error:error.message,
            success: false
    })
    }
  }

// profile image uplaode

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture
    const userId = req.user.id
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )
    console.log(image)
    const userdetails = await usermodel.findById(userId);
    const profileId= userdetails.additionalDetails;
   
    await profilemodel.findByIdAndUpdate(profileId, {image:image.secure_url })
    const updateduser= await usermodel.findByIdAndUpdate(userId).populate("additionalDetails").exec();
     
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updateduser,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}




// dellete account 
exports.deleteaccount= async (req, res) => {   
try {
        const userid = req.user.id;
        const userdetials = await usermodel.findById(userid);
        if(!userdetials){
            console.log("user not find")
            res.status(400).json({
                message:"user not found",
                success:false
            })
            return;
        }
    //find profile and delete
    // additional-- send a verificatin otp to delete account
    await profilemodel.findByIdAndDelete({_id:userdetials.additionalDetails})
    await usermodel.findByIdAndDelete({_id:userid})

    // think how we sudule the deletion process ( cron-job)

    res.status(200).json({
                message:"account is deleted",
                success:true
            })

} catch (error) {
    res.status(500).json({
                message:"account is not deleted",
                success:false,
                error: error.message
            })
    
}

}



// get the users 


exports.getuserdetials = async (req,res) => {

   try {
        console.log("Inside getUserDetails in backend"); 
       const userid= req.user.id;
       const user = await usermodel.findById(userid).populate("additionalDetails").exec();
       res.status(200).json({
                message:"user data found",
                success:true,
                data:user
            })
        console.log("backend userdetails send;")

   } catch (error) {
    res.status(500).json({
                message:"user data not found",
                success:false,
                error: error.message
            })
    
   }
}