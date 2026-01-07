const subsectionmodel =require("../models/subsection")
const sectionmodel = require("../models/section")
const { uplodetocloudinary } = require("../utils/uploder");


exports.createsubsection = async (req,res) => {
    
     let {tital,discription,timeduration,sectionid}=req.body;
     const vedio = req.file.vediofile;

     try {
             if(!tital || !discription || !timeduration || !vediofile){
        console.log("every field is required")
     }
    
     const vediourl = await uplodetocloudinary(vedio, process.env.folder_name)

     //create a new section
    const newsubsection = await subsectionmodel.create({
        tital,
        discription,
        timeduration,
        vediourl : vediourl.sequre_url
    })
    console.log("new newsubsection created", newsubsection)



    // insertion of subsection id in section
   await sectionmodel.findByIdAndUpdate(sectionid,{
    $push:{subsection:newsubsection._id}},
    {new:true})
    console.log ("new subsection id is inserted in sectin" , newsubsection.id)


    res.status(200).json({
        success:true,
        message:"new subsection is created",
        data:newsubsection
    })
     }

catch (error) { 
    res.status(500).json({
        success:false,
        message:"new subsection is not created",
        error:error.message
    })
     }

}






// update subsection or edit the subsection

exports.updatesubsection= async (req,res) => {

     let {tital,discription,timeduration,subsectionid}=req.body;
     const vedio = req.file.vediofile;

     try {
             if(!tital || !discription || !timeduration || !vediofile){
        console.log("every field is required")
     }
    
     const vediourl = await uplodetocloudinary(vedio, process.env.folder_name)

     //create a new section
    await subsectionmodel.findByIdAndUpdate(subsectionid ,{
        tital,
        discription,
        timeduration,
        vediourl : vediourl.sequre_url
    })
    console.log("subsection is updated ")

    res.status(200).json({
        success:true,
        message:"subsection is updated",
        data:updatedsubsection
    })
     }

catch (error) { 
    res.status(500).json({
        success:false,
        message:"subsection is not updated",
        error:error.message
    })
     }

}



exports.deletesubsection=async (req,res) => {
    
    let {subsectionid}=req.body

    try {
         await subsectionmodel.findByIdAndDelete(subsectionid)
         //is thair need to delete section id from course model??
     res.status(200).json({
        success:true,
        message:"subsection is deleted",
    })
        
    } catch (error) {
     res.status(500).json({
        success:false, 
        message:"subsection is not deleted",
        error:error.message
    })
    }
   

}