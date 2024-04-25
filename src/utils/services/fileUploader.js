import multer from "multer"
import AppError from "./AppError.js"

export const acceptedExtention ={
    image:["image/jpeg","image/png"],
    pdf:["application/pdf"],
}

export const onlineFileUpload =(Extentions)=>{            // [] used to know that params is array
    if(!Extentions){                                      // if no array is given
        Extentions = acceptedExtention.image 
    }
    const storage = multer.diskStorage({})

    function fileFilter(req, file, cb) {
        if (Extentions.includes(file.mimetype)){
            cb(null, true)
        } else {
            cb(new AppError(`invalid file extention`,400 ), false)
        }
    }

    const upload = multer({storage,fileFilter}).single('image')
    return upload
    
}
