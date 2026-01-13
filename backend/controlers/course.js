const coursemodel = require("../models/course")
const Categorymodel = require("../models/category");
const usermodel = require("../models/user-model")
const sectionmodel=require("../models/section")
const { uploadImageToCloudinary } = require("../utils/uploder")





/// create cource 
exports.createCourse=async (req ,res)=>{
  
let{ courseName,
  courseDescription,
  price,
  tag,
  whatYouWillLearn,
  category,
  status,
  instructions}=req.body;

//   console.log(req.body)
// console.log(req.files.thumbnailImage)
const imagefile = req.files.thumbnailImage;
try {
 //validation 
    if( !courseName || !courseDescription || !whatYouWillLearn || !category || !imagefile ){
       return res.status(400).json({
            message:"not all fields or field",
            success: true
        })
    }
    console.log("create course backend-- 1")
    // check for istructor
     const userid = req.user.id;
     const instructor = await usermodel.findById(userid);
    //  console.log("instructor detials", instructor)

     if (!instructor) {
        console.log ("no instructor find")
        return res.status(400).json({
            message:"no instructor find",
            success: false
        })
     }

    const categorydetail = await Categorymodel.findOne({_id:category})
     if (!categorydetail) {
        console.log ("no category details find")
        return res.status(400).json({
            message:"no category details find",
            success: false 
        })
        }
    // console.log("categery details", categorydetail)

    // uploade image

    const thumbnailimage = await uploadImageToCloudinary(imagefile , process.env.folder_name)
    // console.log("cloudnery image string url--",thumbnailimage)

    // new cource

   
    const newcourse = await coursemodel.create({
            courseName,
            courseDescription, 
            price, 
            whatYouWillLearn,
            thumbnail: thumbnailimage.url, 
            teacher: instructor._id,
            category: categorydetail._id,  
            coursecontent: [], 
    })
        // console.log("new uploded cource--" , newcourse)

    // add this cource to instructor shema
    const updateduser= await usermodel.findByIdAndUpdate(
        instructor._id,
        {$push:{courses: newcourse._id}},
        {new:true} 
    )

    // console.log("course id updated in user---", updateduser)

    // update tag schema 
    console.log("course id updated in cattegery--",categorydetail._id,newcourse._id)
    console.log("Updating category...");

const updatedCategory = await Categorymodel.findOneAndUpdate(
  { _id: categorydetail._id },
  { $addToSet: { courses: newcourse._id } },
  { new: true }
);

if (!updatedCategory) {
  throw new Error("Category update failed");
}

console.log("Category after update:", updatedCategory);

    
    //return

    return res.status(200).json({
        massage:"new course created",
        success:true,
        data: newcourse
    })

} 
catch (error) {
        res.status(500).json({
            success:true,
            massage:"new cource not created",
            error: error.message
        })
}
}

exports.createSubsection=async(req,res)=>{
    try {
    const{sectionname, courseid}=req.body;
    if(!sectionname || !courseid){
        return res.status(403).json({
            message: "all data not send",
            success:false
        })
    }
    const newsection= await sectionmodel.create({
        sectionname,
        subsection: []
    })

    const updatecourse = await coursemodel.findByIdAndUpdate(courseid,
        {$push: {coursecontent:newsection._id}},
        {new: true }
    );
    await updatecourse.populate({
                            path:"coursecontent",
                            populate:{
                                path:"subsection"
                            }
                        })

    return res.status(200).json({
        success:true,
        message:"new section added in course",
        data:updatecourse
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"section not created",
            error
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