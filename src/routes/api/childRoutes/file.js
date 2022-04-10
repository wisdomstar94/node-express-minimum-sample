const express = require('express');
const router = express.Router();
// const jwt = require('jsonwebtoken');
// const myHash = require('../../../librarys/myHash');
const myGetMakeToken = require('../../../librarys/myGetMakeToken');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const myDate = require('../../../librarys/myDate');
const myGetFileNameAndType = require('../../../librarys/myGetFileNameAndType');
require('dotenv').config();


const uploadFileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const YYYYMM_folder_name = myDate().format('YYYYMM');

    const check_folder = path.join(__dirname, '..', '..', '..', '..', 'files', YYYYMM_folder_name + '/');
    !fs.existsSync(check_folder) && fs.mkdirSync(check_folder, { recursive: true });

    // req.fileImageSaveFolder = check_folder;
    req.fileImageYYYYMM = YYYYMM_folder_name;

    cb(null, check_folder);
  },
  filename: function (req, file, cb) {
    const getFileNameAndTypes = myGetFileNameAndType({ full_file_name: file.originalname });
    
    const allow_files = [
      'jpg', 'jpeg', 'png', 'gif',
      'JPG', 'JPEG', 'PNG', 'GIF',
    ];
    
    let filename = getFileNameAndTypes.file_only_name + '_' + myGetMakeToken({ strlength: 40 }) + '.' + getFileNameAndTypes.file_only_type;
    if (!allow_files.includes(getFileNameAndTypes.file_only_type)) {
      filename = filename + '.blocked';
    }
    
    cb(null, filename); // cb 콜백함수를 통해 전송된 파일 이름 설정
  }
});
const uploadFileUpload = multer({ 
  storage: uploadFileStorage, 
  limits: { fileSize: 1000 * 1024 * 1024 } // 1000mb (1 * 1024 * 1024 = 1MB)
});



router.post('/upload', uploadFileUpload.single('upfile'), function(req, res, next) {
  console.log('req.file', req.file);

  res.status(200).json({
    result: 'success',
  });
  return;
});

module.exports = router;
