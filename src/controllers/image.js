
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, './public/images/')
  },
  filename: async (req, file, cb) => {
    console.log(file)
    cb(null, file.originalname)
  }
})
const upload = multer({storage: storage}).array('file')



const uploadImage = async (req, res, next) => {
  upload(req, res, (err) => {
    if(err){
      res.send(err)
    }else{
      console.log("success")
    }
  })
}

module.exports = {
  uploadImage
}