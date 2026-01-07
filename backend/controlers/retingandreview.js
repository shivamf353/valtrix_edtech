const ratingAndReviwsmodel = require("../models/ratingAndReviws")
const coursemodel = require("../models/course");
const { default: mongoose } = require("mongoose");



 // create rating 

 exports.createrating= async (req,res) => {
try {
         const{rating,review ,courseid}=req.body
     const userid = req.user.id;

     if(rating || !review){
        console.log ("all filed is required")
        res.status(400).json({
            message:"all fild is required",
            success:false
        })
        return;
     }

     //chack user inroled or not
     const validuser = await coursemodel.findOne({_id:courseid,
                                        studentenroled:{$elemMatch:{$eq:userid}}
     })    
    if(!validuser){
        res.status(400).json({
            message:"not a valid user",
            success:false
        })
    }


    const user = await ratingAndReviwsmodel.findOne({user:userid,course:courseid})    
    if(user){
        res.status(400).json({
            message:"allready reviewd",
            success:false
        }) 
    }

    const newrating=await ratingAndReviwsmodel.create({
        rating,
        review,
        user: userid,
        course :courseid
     })

    // update in cource

    await coursemodel.findByIdAndUpdate({_id:courseid},{
                                       $push:{ratingAndReviws:newrating.id}},
                                     {new:true}  )

    res.status(200).json({
        message:"new rating created",
        success:true,
        data:newrating
    })
} catch (error) {
    res.status(500).json({
        message:"new rating not created",
        success:false,
        error:error.message
    
})
}

     
 }



 // calculate rating and review


 exports.averagerating= async (req,res) => {
    
 try {
       let {courseid}=req.body

    const result = await ratingAndReviwsmodel.aggregate([
                                   {$match: {course: new mongoose.Types.ObjectId(courseid)}},
                                   {$group:{_id:null,
                                            averagerating:{$avg: "$rating"},
                                            totalrating:{$sum: 1}}}
                                   ]).exec();
    


    if(result.length===0){
        console.log("no rattings on the code");
        res.status(200).json({
            message:"no rating on cource",
            success:true,
        })
    }

      res.status(200).json({
            message:"rating on cource is found",
            success:true,
             averagerating: result[0].averagerating ,  // hear result is a array and average rating is avilable on 0th index so we use result[0]
            totalrating: result[0].totalrating         
        })
 
 } catch (error) {
    res.status(200).json({
            message:"error in calculating average rating",
            success:false,
            
 })
}
 }



// get all rating and review and arange with top rating first

 exports.getallratingandreview = async (req, res) => {
  
try {
        const allratingAndReviws= await ratingAndReviwsmodel.find({})
                                                     .sort({rating:"desc"})
                                                     .populate({
                                                        path:"cource",
                                                        sellect:"courcename"
                                                     })
                                                     .populate({
                                                        path:"user",
                                                        sellect:"firstname,lastname"
                                                     })
                                                    .exec()
    if(allratingAndReviws===0){
        res.status(400).json({
        menubar:"no reating and review is find",
        success: false,
    })   
    }

    res.status(200).json({
        menubar:"all reating and review is find",
        success: true,
        data: allratingAndReviws
    })
           
} catch (error) {
         res.status(500).json({
        menubar:"no reating and review is find",
        success: false,
    })   
}                          
    
 }



 // get all ratings of specific courses

 exports.getallratingandreview = async (req, res) => {
  
try {
      let {courseid}= req.body;
        const allratingAndReviws= await ratingAndReviwsmodel.find({course: new mongoose.Types.ObjectId(courseid)})
                                                     .sort({rating:"desc"})
                                                     .populate({
                                                        path:"course",
                                                        select:"coursename"
                                                     })
                                                     .populate({
                                                        path:"user",
                                                        select:"firstname lastname"
                                                     })
                                                    .exec()
    if(allratingAndReviws.length===0){
        res.status(400).json({
        menubar:"no reating and review is find",
        success: false,
    })   
    }

    res.status(200).json({
        menubar:"all reating and review is find",
        success: true,
        data: allratingAndReviws
    })
           
} catch (error) {
         res.status(500).json({
        menubar:"no reating and review is find",
        success: false,
    })   
}                          
    
 }

