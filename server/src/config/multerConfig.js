const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {        
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ 
    storage: storage,
     limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        console.log('In File Filter');
        let ext = path.extname(file.originalname);
        if (ext === '.jpg' || ext === '.png' || ext === '.gif' || ext === '.jpeg' || ext === '.mp4' || ext === '.avi' || ext === '.mov' || ext === '.wmv') {
            console.log('Extension Check');
            cb(null, true);
        } else {
            cb('Only Images and Videos Are Allowed', false);
        }
    }
});

module.exports = upload;
