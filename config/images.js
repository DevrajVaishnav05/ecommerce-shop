const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const upload = multer({
    storage: multer.diskStorage({
        destination: '../public/images/update',
        filename: (req, file, cb) =>
            crypto.randomBytes(12, (err, bytes) =>
                cb(err, err ? undefined : bytes.toString('hex') + path.extname(file.originalname))
            )
    })
});

module.exports = upload;
