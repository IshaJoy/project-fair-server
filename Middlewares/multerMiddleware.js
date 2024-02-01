const multer = require('multer')
// predefined keys(diskStorage)
const storage = multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null,'./uploads')
        // ./uploads is a path(imp)
    },
    filename:(req,file,callback)=>{
        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null,filename)
    }
})

const fileFilter = (req,file,callback)=>{
    if (file.mimetype==="image/png" || file.mimetype==="image/jpg" || file.mimetype==="image/jpeg") {
       callback(null,true) 
    }else{
        callback(null,false)
        return callback(new Error("Please upload file with the following extensions (png,jpg,jpeg) only "))
    }
}

const multerConfig = multer({
    storage,fileFilter
})

module.exports = multerConfig

