import multer from "multer";
import { diskStorage } from "multer";
//import { nanoid } from "nanoid";
import generateUniqurString from "../utils/generateUniqueString.js";
import { allowedExtentions } from "../utils/allowedExtensions.js";

import fs from "fs"; //built in module
import path from "path";

// /////// disckStorage//////
//  function >>>>> const x= duscStorage({destination:,filename:})
// discStorage({destinatiion: string | function , filename: function  })

/////// multer////////////
// function >>>>> multer ({ storage: x}) >> take the return of duscStorage(x)
export function uploadFile({
  filePath = "general",
  extentions = allowedExtentions.image,
}) {
  //path check

  if (!fs.existsSync(path.resolve(`uploads/${filePath}`))) {
    fs.mkdirSync(path.resolve(`uploads/${filePath}`), { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/${filePath}`);
    },
    filename: (req, file, cb) => {
      //lw m3mltsh fileName multer ht3ml name bs msh ht7dd no3 el file
      // console.log(file)
      // encoding: 7 bit //bit zero for error
      // mimetype : image/png
      // js>>>> application/js
      // size in bytes
      //destination>>> 'uploads'
      //filename
      //path >> on uploads

      cb(null, generateUniqurString(7) + " __" + file.originalname);
    },

    // req elly gay , file=> data of uploaded file,
  });

  const fileFilter = (req, file, cb) => {
    if (extentions.includes(file.mimetype.split("/")[1])) {
      // call next and save image
      return cb(null, true);
    }

    //throw error +donnot sve the file
    return cb(new Error("Invalid file format"), false);
  };

  const multerUpload = multer({ fileFilter, storage: storage }); //3lashan el file name
  return multerUpload; //{} multerupload is a function contain midlware methods(single,array())
}

// multer is a middleware ,so we will make router
