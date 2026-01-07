const cloudinary = require('cloudinary').v2 


exports.uplodetocloudinary =async (file,folder,hight,quality) => {
const option ={folder}
if(hight){
    option.hight =hight;

}
if(quality){
    option.hight =quality;
}
option.resource_type="auto";

let uplodedfile = await cloudinary.v2.uploader.upload(file.tempFilepath, option)

return uplodedfile;
    
}