const Categorymodel = require("../models/category");


// create tag
exports.createcategory =async(req, res)=>{
    const { name,  discription} = req.body;
try {
    const category= await Categorymodel.findOne({name});
     console.log(category)
    if (category){
        res.status(400).json({
            massage: "category already exists",
            success: false,
            category
        })
     
    }

    else{
        console.log("check y")
        let newcategory= await Categorymodel.create({
            name,
            discription,
            courses:null
        })
       
        console.log("new category created")
        res.status(200).json({
            massage:"new category created",
            success:true,
            newcategory
        })
    }

} catch (error) {
    
    res.status(500).json({
        massage:error.massage,
        success:false
    })
}
}



//show all tags 

exports.showallcategory = async(req, res)=>{
    try {
 
    const allcategory =await Categorymodel.find({},{name:1, discription:1})
        res.status(200).json({
            success: true,
            message:"all category are found",
            allcategory
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message:error.message,
        }) 
    }
} 


exports.categorypagedetials= async(req,res) => {
    const {categoryid}=req.body;

    const categoryDetails= await Categorymodel.findById(categoryid)
                                       .populate("courses")
                                       .exec()
    if(!categoryDetails)(
        res.status(400).json({
            message: "no data found",
            success: false,
        })
    )
    const otherCategoryDetails = await Categorymodel.findOne({_id: {$ne:categoryid}})
                                                    .populate("courses")
                                                    .exec()

    res.status(200).json({
        message:"all categary detials found",
        success:true,
        category:categoryDetails,
        othercategory:otherCategoryDetails
    })


}