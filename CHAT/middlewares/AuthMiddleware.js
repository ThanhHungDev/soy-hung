const jwtHelper   = require("../helpers/jwt.helper"),
      errorHelper = require('../helpers/error.helper')

/**
 * Middleware: Authorization user by Token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
let isAuth = async (req, res, next) => {
    // Lấy token được gửi lên từ phía client, thông thường tốt nhất là các bạn nên truyền token vào header
    const access =  req.headers["x-access-token"] || req.query.token || req.body.token

    if (!access) {
        /// không tồn tại access token
        req.errors = { token : {"message":'No token provided.',"rule":"required"} }
        return errorHelper.apiResponseErrorResource( req, res )
    }
    // Nếu tồn tại token access
    try {
        // Thực hiện giải mã token xem có hợp lệ hay không?
        const user = await jwtHelper.verifyTokenAccess(access)

        // Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.
        req.jwtUser = user

        // Cho phép req đi tiếp sang controller.
        next();
    } catch (error) {
        // Nếu giải mã gặp lỗi: Không đúng, hết hạn...etc:
        let response = {
            code: 401,
            message: 'Unauthorized.',
            internal_message: error.message
        }
        return res.status(response.code).json(response)
    }
}

module.exports = {
    isAuth,
}