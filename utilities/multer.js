const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    if(file.fieldname=="productImage")
      cb(null, './public/images/upload')
    },
    filename: function (req, file, cb) {
      const now = new Date(Date.now())
      cb(null,now.getSeconds() + '-' + file.originalname)
    }
  });

  module.exports = storage