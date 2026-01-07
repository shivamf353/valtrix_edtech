const coursemodel = require("../models/course")
const sectionmodel = require("../models/section")


exports.createsection = async (req,res) => {
    
     let {sectionname, courseid}=req.body;

     try {
             if(!sectionname || !courseid){
        console.log("every field is required")
     }
    
     //create a new section
    const newsection = await sectionmodel.create({
        sectionname
    })
    console.log("new section created", newsection)



    // insertion of section id in courcemodel
   await coursemodel.findByIdAndUpdate(courseid,{
    $push:{coursecontent:newsection._id}},
    {new:true})
    console.log ("new section id is inserted in course" , newsection.id)


    res.status(200).json({
        success:true,
        message:"new section is created",
        data:newsection
    })
     }

catch (error) { 
    res.status(500).json({
        success:false,
        message:"new section is not created",
        error:error.message
    })
     }

}






// update section or edit the section
exports.updatesection= async (req,res) => {
    
     let {sectionname ,sectionid}=req.body;

     try {
             if(!sectionname || !sectionid){
        console.log("every field is required")
     }  


    // update a section
  let updatedsection= await sectionmodel.findByIdAndUpdate(sectionid,{
    sectionname},
    {new:true})
    console.log ("section is updated" , updatedsection.id)


    res.status(200).json({
        success:true,
        message:"section is updated",
        data:updatedsection
    })
     }

catch (error) { 
    res.status(500).json({
        success:false,
        message:"section is not updated",
        error:error.message
    })
     }

}



exports.deletesection=async (req,res) => {
    
    let {sectionid}=req.body

    try {
         await sectionmodel.findByIdAndDelete(sectionid)
         //is thair need to delete section id from course model??
     res.status(200).json({
        success:true,
        message:"section is deleted",
    })
        
    } catch (error) {
     res.status(500).json({
        success:false, 
        message:"section is not deleted",
        error:error.message
    })
    }
   

}