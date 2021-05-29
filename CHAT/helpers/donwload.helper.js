const fs         = require('fs')
const downloader = require('image-downloader')

/**
 * @param  { String } uri là đường dẫn url để download `ví dụ: https://www.google.com/images/srpr/logo3w.png`
 * @param  { String } filename là tên file mình sẽ lưu trữ `ví dụ google.png `
 * @param  { Function } callback là hàm function khi thực hiện xong sẽ được trả về
 */
let download = function (uri, filename, callback) {
    let options = { url: uri, dest: filename }
      
    downloader.image(options)
    .then(({ filename }) => {
        console.log('Saved to', filename)  // saved to /path/to/dest/photo.jpg
    })
    .catch((err) => console.error(err))
}

// let downloadX = async function download(url, dest) {

//     /* Create an empty file where we can save data */
//     const file = fs.createWriteStream(dest);

//     /* Using Promises so that we can use the ASYNC AWAIT syntax */
//     return await new Promise((resolve, reject) => {
//         request({
//             /* Here you should specify the exact link to the file you are trying to download */
//             uri: url,
//             gzip: true,
//         })
//         .pipe(file)
//         .on('finish', async () => {
//             console.log(`The file is finished downloading.`)
//             resolve()
//         })
//         .on('error', (error) => {
//             reject(error)
//         })
//     })
//     .catch((error) => {
//         console.log(`Something happened: ${error} ${dest}`, url )
//     })
// }



module.exports = {
    download,
    // downloadX,
}
