
const jwtHelper = require("../helpers/jwt.helper")
/**
 * controller login
 * @param {*} req 
 * @param {*} res 
 */
let login = (req, res) => {
    
    try {
        const email = "jstruongthanhhung@gmail.com"
        const username = "46789fghjkdfgh"

        const user = {
            email, username
        }
        const access = jwtHelper.generateTokenAccess( user )
        const refresh = jwtHelper.generateTokenRefresh( user )

        return res.status(200).json({ access, refresh })
    } catch (error) {

        return res.status(500).json({ hung: "lỗi" + error.message })
    }
}

/**
 * controller refreshToken method post
 * @param {*} req 
 * @param {*} res 
 */
let refreshToken = async (req, res) => {
    // User gửi mã refresh token kèm theo trong body
    const { token } = req.body

    if ( !token ) {
        // Không tìm thấy token trong request
        return res.status(403).send({
            message: 'No token provided.',
        });
    }
    // Nếu như tồn tại token thì giải mã
    try {
        // Verify kiểm tra tính hợp lệ của cái refreshToken và lấy dữ liệu giải mã decoded 
        const user = await jwtHelper.verifyTokenRefresh( token )

        const access = jwtHelper.generateToken( user )

        // gửi token mới về cho người dùng
        return res.status(200).json({ access })
    } catch (error) {
        
        res.status(403).json({
            message: 'Invalid refresh token.',
        });
    }
}

module.exports = {
    login,
    refreshToken,
}