
const fs     = require('fs'),
      multer = require('multer')

const UPLOAD_FILES_DIR = './public/uploads/files/'

const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        
        callback(null, UPLOAD_FILES_DIR ) //hỉnh ảnh sẽ chứa trong folder uploads
    },
    filename: (req, file, callback) => {

        // callback(null , file.originalname)// mặc định sẽ save name của hình ảnh 
        fs.stat(UPLOAD_FILES_DIR + file.originalname, (err, stats) => {
            let filename
            
            if (stats) {
                filename = Date.now() + '.' + file.originalname
            } else {
                filename = file.originalname
            } 
            callback(null, filename)
        })
    }
})

/* defined filter */
const fileFilter = (req, file, callback) => {
    if (
        file.mimetype != "image/png" &&
        file.mimetype != "image/jpg" &&
        file.mimetype != "image/jpeg"
    ) {
        callback(null, true)
    } else {
        callback(new Error("File format not image"), false)
    }
}

//save trên local của server khi dùng multer ./public/uploads/images
let uploadFile = multer({ storage: fileStorage, fileFilter: fileFilter }).single("file") /// => đây đang là 1 middleware dạng: (req, res, next ) => {  }


let toResources = file => {
    if(!file){
        return {}
    }
    return {
        name    : file.originalname,
        url     : "/" + file.path.trim(),
        path    : file.path,
        mimetype: file.mimetype,
        size    : file.size
    }
}

module.exports = {
    uploadFile,
    toResources,
}




// fs.stat(path, callback)
// Chi tiết về tham số

// path - Đây là một chuỗi biểu diễn tên file cũng như đường dẫn tới file đó.

// callback - Là hàm callback nhận hai tham số (err, stats), trong đó stats là một đối tượng của fs.Stats được in ra như trong ví dụ sau.

// Ngoài các thuộc tính quan trọng được in ra như trong ví dụ sau, lớp fs.Stats còn có một số phương thức hữu ích có thể được sử dụng để kiểm tra kiểu file. Đó là:

// Phương thức	Miêu tả
// stats.isFile()	Trả về true nếu đó là một file
// stats.isDirectory()	Trả về true nếu đó là một thư mục
// stats.isBlockDevice()	Trả về true nếu đó là một Block Device.
// stats.isCharacterDevice()	Trả về true nếu đó là một Character Device.
// stats.isSymbolicLink()	Trả về true nếu đó là một Symbolic Link.
// stats.isFIFO()	Trả về true nếu đó là một kiểu FIFO.
// stats.isSocket()	Trả về true nếu đó là một kiểu Socket.




/**
 * @swagger
 * components:
 *     schemas:
 *         FileResources:
 *             type: object
 *             properties:
 *                  name:
 *                     type: string
 *                     description: tên file
 *                     example: bg_girl_login.doc
 *                  url: 
 *                      type: string
 *                      description: đường dẫn tới file
 *                      example: /uploads/files/1620975059103.bg_girl_login.doc
 *                  path:
 *                      type: string
 *                      description: đường dẫn vật lý tới file 
 *                      example: public/uploads/files/1620975059103.bg_girl_login.doc
 *                  mimetype:
 *                      type: string
 *                      description: kiểu file
 *                  size: 
 *                      type: int
 *                      description: 
 *                      example: 214853
 */