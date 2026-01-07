const coursemodel = require("../models/course")
const categorymodel = require ("../models/category")
const usermodel = require("../models/user")
const { uplodetocloudinary } = require("../utils/uploder")
const { populate } = require("../models/ratingAndReviws")




/// create cource

exports.createcourse=async (req ,res)=>{

    let {coursename,coursediscription,whattolearn,price,category}=req.body;
    const imagefile = req.file.thumbnail
try {
        //validation 

    if( !coursename || !coursediscription || !whattolearn || !category ){
        res.status(400).json({
            massage:"not all fields or field",
            success: true
        })
    }
    // check for istructor
     const userid = req.user.id;
     const instructor = await usermodel.findById({userid});
     console.log("instructor detials", instructor)

     if (!instructor) {
        console.log ("no instructor find")
        res.status(400).json({
            massage:"no instructor find",
            success: false
        })
     }
    
    // tag validation
    const categorydetial =await categorymodel.findOne({tagname})
     if (!categorydetial) {
        console.log ("no category detials find")
        res.status(400).json({
            massage:"no category detials find",
            success: false 
        })
        }

    // uploade image

    const thumbnailimage = await uplodetocloudinary(imagefile , process.env.folder_name)

    // new cource

    const newcourse = await coursemodel.create({
            coursename,
            coursediscription, 
            price, 
            whattolearn,
            thumbnail: thumbnailimage, 
            teacher: instructor._id,
            category: categorydetial._id     
    })


    // add this cource to instructor shema
    await usermodel.findByIdAndaUpdate(
        {_id:instructor._id},
        {$push:{courses: newcourse._id}},
        {new:true} 
    )

    // update tag schema 

    await categorymodel.findByIdAndUpdate(
        {_id: categorydetial._id},
        {$push:{ courses: newcourse_id}},
        {new:true}
        )
    
    //return

    res.status(200).json({
        massage:"new course created",
        success:true,
        data: newcourse
    })

} 
catch (error) {
        res.status(500).json({
            success:true,
            massage:"new cource not created",
            error: error.massage
        })
}
}

/// code far showing all coursess to the interface 
exports.showallcourses= async (res,req) => {
    try {
        const allcourses = await coursemodel.find({})
        res.status(200).json({
            massage:"all cources are shown",
            success: true,
            data:allcourses
        })
        } 
    catch (error) {
         res.status(500).json({
            massage:"cources cant be load",
            sucsses:false,
            error:error.massage
            })
        }
}


// show each cource detials
exports.getcourse=async (req,res) => {
    let  {courseid}=req.body;

   try {
         const coursedetails = await coursemodel.findById(courseid);
        await coursedetails.populate({
                         path:"teacher",
                         populate:{
                            path:"additionalditials"
                         }
                        })
                        .populate({
                            path:"coursecontent",
                            populate:{
                                path:"subsection"
                            }
                        })
                        .populate({
                            path:"studentenroled",
                            populate:{
                                path:"additionalditials"
                            }
                        })

                        .populate({
                            path:"ratingAndReviws",
                            populate:{
                                path:"user" 
                            }
                        })
                        .populate("category")
                        .exec();

        if (!coursedetails) {
         return res.status(404).json({ 
            success: false,
            message: "Course not found" 
         });
        }

        res.status(200).json({
            massage:"all cources are shown", 
            success: true,
            data:coursedetails
        })  

   } catch (error) {
      res.status(500).json({
            massage:"cources cant be load",
            sucsses:false,
            error:error.massage
            })
   }
}