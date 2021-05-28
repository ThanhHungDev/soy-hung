const fs      = require('fs')
const request = require('request')

/**
 * @param  { String } uri là đường dẫn url để download `ví dụ: https://www.google.com/images/srpr/logo3w.png`
 * @param  { String } filename là tên file mình sẽ lưu trữ `ví dụ google.png `
 * @param  { Function } callback là hàm function khi thực hiện xong sẽ được trả về
 */
let download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        // console.log('content-type:', res.headers['content-type']);
        // console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback)
    })
}

let downloadX = async function download(url, dest) {

    /* Create an empty file where we can save data */
    const file = fs.createWriteStream(dest);

    /* Using Promises so that we can use the ASYNC AWAIT syntax */
    return await new Promise((resolve, reject) => {
        request({
            /* Here you should specify the exact link to the file you are trying to download */
            uri: url,
            gzip: true,
        })
        .pipe(file)
        .on('finish', async () => {
            console.log(`The file is finished downloading.`)
            resolve()
        })
        .on('error', (error) => {
            reject(error)
        })
    })
    .catch((error) => {
        console.log(`Something happened: ${error} ${dest}`, url )
    })
}



module.exports = {
    download,
    downloadX,
}
