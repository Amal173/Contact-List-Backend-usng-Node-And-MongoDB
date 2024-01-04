const multer=require("multer");
const StoreFile=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname)
    }
});

const upload=multer({storage:StoreFile}).single("imagepath");

module.exports=upload;
