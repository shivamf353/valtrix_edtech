
//method--1
   // we already created the profile model while creating the user with null 
   //show we have to update existin data of the user profile

// method -2
  // we can also create the profile data and insert its id in user both are good .
  //
const usermodel = require("../models/user-model")
const profilemodel = require("../models/profile")
const { uplodetocloudinary } = require("../utils/uploder")




  exports.updateprofile= async (req,res) => {
    
    try {
        let{ gender,dateofbirth,about,contectno}= req.body
    const image = req.file.image
    const imageurl = uplodetocloudinary(image , process.env.folder_name)

    const userid= req.user.id;
    const userditial = await usermodel.findById(userid)
    const profileid = userditial.additionalditials;
    const profiledetials = await profilemodel.findById(profileid);

    //update profile

    profiledetials.dateofbirth = dateofbirth
    profiledetials.gender=gender
    profiledetials.about=about
    profiledetials.contectno=contectno
    profiledetials.imageurl=imageurl

    await profiledetials.save();

    res.status(500).json({
            message:"profile updated",
            success: true
    })


    } catch (error) {

        res.status(500).json({
            message:"profile not updated",
            error:error.message,
            success: false
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
    await profilemodel.findByIdAndDelete({_id:userdetials.additionalditials})
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