const multer = require('multer');

// Set up storage using multer.diskStorage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'backend/asserts/') // The destination directory for storing uploaded files
  },
  filename: function (req, file, cb) {
    // Use a unique filename to prevent overwriting
    cb(null, Date.now() + '-' + file.originalname)
  }
});
exports.upload = multer({ storage: storage });


