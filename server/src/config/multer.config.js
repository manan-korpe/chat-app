import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/img/");
    },
    filename:(req,file,cb)=>{
        const filename = `${Date.now()}_${path.extname(file.originalname)}`;
        cb(null,filename);
    }
});

// const storage = multer.memoryStorage();
const upload = multer({storage});

export default upload;