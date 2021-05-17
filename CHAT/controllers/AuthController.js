
const jwtHelper = require("../helpers/jwt.helper"),
      bcrypt    = require('bcrypt'),
      User      = require('../models/User')
/**
 * @swagger
 *  /api/v1/login:
 *      post:
 *          summary: login user với email - password
 *          description: login với jwt
 *          tags: [ user ]
 *          parameters:
 *              - in: body
 *                name: email
 *                schema:
 *                  type: string
 *                  example: jbtruongthanhhung@gmail.com
 *              - in: body
 *                name: password
 *                schema:
 *                  type: string
 *                  example: admin123
 *          responses:
 *              200:
 *                  description: lấy access token và refresh token
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                 code:
 *                                      type: integer
 *                                      description: chỉ định mã lỗi để FE handle
 *                                      example: 200
 *                                 data: 
 *                                      type : object
 *                                      description: chỉ định mã lỗi để FE handle
 *                                      properties: 
 *                                          access:
 *                                              type: string
 *                                              description: access token của user dùng để giao tiếp với app
 *                                              example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwiX2lkIjoiNjA5ZGQyNDFlNzI4YzAwZjUyN2ZiNGQ1Iiwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwibmFtZSI6ImluaXQiLCJfaWQiOiJpbml0IiwiY3JlYXRlZEF0IjoiaW5pdCIsInVwZGF0ZWRBdCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfaWQiOnRydWUsIm5hbWUiOnRydWUsImVtYWlsIjp0cnVlLCJwYXNzd29yZCI6dHJ1ZSwiY3JlYXRlZEF0Ijp0cnVlLCJ1cGRhdGVkQXQiOnRydWUsIl9fdiI6dHJ1ZX0sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiLCJpZ25vcmUiXX0sInBhdGhzVG9TY29wZXMiOnt9LCJjYWNoZWRSZXF1aXJlZCI6e30sIiRzZXRDYWxsZWQiOnt9LCJlbWl0dGVyIjp7Il9ldmVudHMiOnt9LCJfZXZlbnRzQ291bnQiOjAsIl9tYXhMaXN0ZW5lcnMiOjB9LCIkb3B0aW9ucyI6eyJza2lwSWQiOnRydWUsImlzTmV3IjpmYWxzZSwid2lsbEluaXQiOnRydWUsImRlZmF1bHRzIjp0cnVlfX0sImlzTmV3IjpmYWxzZSwiJGxvY2FscyI6e30sIiRvcCI6bnVsbCwiX2RvYyI6eyJfaWQiOiI2MDlkZDI0MWU3MjhjMDBmNTI3ZmI0ZDUiLCJuYW1lIjoidGVzdCB0aOG7rSIsImVtYWlsIjoidGhhbmhodW5nLmNvZGVAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkMVZtSkZwWUY0ZVpKOVljZThjUldwZUxoRHVFczBqNFNoa1k3Y0R4MEIyaFJ0N0ZETjVkTUciLCJjcmVhdGVkQXQiOiIyMDIxLTA1LTE0VDAxOjI4OjMzLjIyMloiLCJ1cGRhdGVkQXQiOiIyMDIxLTA1LTE0VDAxOjI4OjMzLjIyMloiLCJfX3YiOjB9LCIkaW5pdCI6dHJ1ZSwiYXV0aG9yaXphdGlvbiI6InVzZXIiLCJpYXQiOjE2MjA5NTkzNjcsImV4cCI6MTYyMDk2Mjk2N30.5D_LO8ajileRV_76Un8PBWUdfX5G6hFXwZyux_2z6hM
 *                                          refresh:
 *                                              type: string
 *                                              description: access token của user dùng để giao tiếp với app
 *                                              example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwiX2lkIjoiNjA5ZGQyNDFlNzI4YzAwZjUyN2ZiNGQ1Iiwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwibmFtZSI6ImluaXQiLCJfaWQiOiJpbml0IiwiY3JlYXRlZEF0IjoiaW5pdCIsInVwZGF0ZWRBdCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfaWQiOnRydWUsIm5hbWUiOnRydWUsImVtYWlsIjp0cnVlLCJwYXNzd29yZCI6dHJ1ZSwiY3JlYXRlZEF0Ijp0cnVlLCJ1cGRhdGVkQXQiOnRydWUsIl9fdiI6dHJ1ZX0sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiLCJpZ25vcmUiXX0sInBhdGhzVG9TY29wZXMiOnt9LCJjYWNoZWRSZXF1aXJlZCI6e30sIiRzZXRDYWxsZWQiOnt9LCJlbWl0dGVyIjp7Il9ldmVudHMiOnt9LCJfZXZlbnRzQ291bnQiOjAsIl9tYXhMaXN0ZW5lcnMiOjB9LCIkb3B0aW9ucyI6eyJza2lwSWQiOnRydWUsImlzTmV3IjpmYWxzZSwid2lsbEluaXQiOnRydWUsImRlZmF1bHRzIjp0cnVlfX0sImlzTmV3IjpmYWxzZSwiJGxvY2FscyI6e30sIiRvcCI6bnVsbCwiX2RvYyI6eyJfaWQiOiI2MDlkZDI0MWU3MjhjMDBmNTI3ZmI0ZDUiLCJuYW1lIjoidGVzdCB0aOG7rSIsImVtYWlsIjoidGhhbmhodW5nLmNvZGVAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkMVZtSkZwWUY0ZVpKOVljZThjUldwZUxoRHVFczBqNFNoa1k3Y0R4MEIyaFJ0N0ZETjVkTUciLCJjcmVhdGVkQXQiOiIyMDIxLTA1LTE0VDAxOjI4OjMzLjIyMloiLCJ1cGRhdGVkQXQiOiIyMDIxLTA1LTE0VDAxOjI4OjMzLjIyMloiLCJfX3YiOjB9LCIkaW5pdCI6dHJ1ZSwiYXV0aG9yaXphdGlvbiI6InVzZXIiLCJpYXQiOjE2MjA5NTkzOTEsImV4cCI6MTYyMTIxODU5MX0.Ui-195Qc_2bCnq1pGA-naeDOUwuLkrbiNa045wfAGvQ
 *                  
*/
let login = async (req, res) => {
    
    const { email, password } = req.body
    let response = {},
        code     = 500

    console.log({email, password}, "login")

    try {
        const user = await User.findOne({ email: email })
        if(!user){
            code = 401
            throw new Error("Invalid Credentials")
        }
        // Then validate the Credentials in MongoDB match
        // those provided in the request
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            code = 401
            throw new Error("Invalid Credentials")
        }

        const access = jwtHelper.generateTokenAccess( user.toResources() )
        const refresh = jwtHelper.generateTokenRefresh( user.toResources() )

        /// response 
        response.code    = 200
        response.data    = { access, refresh }
        response.message = response.internal_message = "Login Successful"
        return res.status(response.code).json(response)

    } catch (error) {

        response.code    = code || 500
        response.message = response.internal_message = error.message
        return res.status(response.code).json(response)
    }
}

/**
 * @swagger
 *  /api/v1/refresh:
 *      post:
 *          summary: refresh token user với token refresh
 *          description: login với jwt
 *          tags: [ user ]
 *          parameters:
 *              - in: body
 *                name: token
 *                schema:
 *                  type: string
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDlkZDI0MWU3MjhjMDBmNTI3ZmI0ZDUiLCJuYW1lIjoidGVzdCB0aOG7rSIsImVtYWlsIjoidGhhbmhodW5nLmNvZGVAZ21haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMS0wNS0xNFQwMToyODozMy4yMjJaIiwidXBkYXRlZEF0IjoiMjAyMS0wNS0xNFQwMToyODozMy4yMjJaIiwiYXV0aG9yaXphdGlvbiI6InVzZXIiLCJpYXQiOjE2MjA5NjAxODEsImV4cCI6MTYyMTIxOTM4MX0.uAVe3LVZU_5wirAj4mNITM1PfbeemA5mVKymJTPJq8g
 *          responses:
 *              200:
 *                  description: lấy access token và refresh token
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                 code:
 *                                      type: integer
 *                                      description: chỉ định mã lỗi để FE handle
 *                                      example: 200
 *                                 data: 
 *                                      type : object
 *                                      description: chỉ định mã lỗi để FE handle
 *                                      properties: 
 *                                          access:
 *                                              type: string
 *                                              description: access token của user dùng để giao tiếp với app
 *                                              example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwiX2lkIjoiNjA5ZGQyNDFlNzI4YzAwZjUyN2ZiNGQ1Iiwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwibmFtZSI6ImluaXQiLCJfaWQiOiJpbml0IiwiY3JlYXRlZEF0IjoiaW5pdCIsInVwZGF0ZWRBdCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfaWQiOnRydWUsIm5hbWUiOnRydWUsImVtYWlsIjp0cnVlLCJwYXNzd29yZCI6dHJ1ZSwiY3JlYXRlZEF0Ijp0cnVlLCJ1cGRhdGVkQXQiOnRydWUsIl9fdiI6dHJ1ZX0sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiLCJpZ25vcmUiXX0sInBhdGhzVG9TY29wZXMiOnt9LCJjYWNoZWRSZXF1aXJlZCI6e30sIiRzZXRDYWxsZWQiOnt9LCJlbWl0dGVyIjp7Il9ldmVudHMiOnt9LCJfZXZlbnRzQ291bnQiOjAsIl9tYXhMaXN0ZW5lcnMiOjB9LCIkb3B0aW9ucyI6eyJza2lwSWQiOnRydWUsImlzTmV3IjpmYWxzZSwid2lsbEluaXQiOnRydWUsImRlZmF1bHRzIjp0cnVlfX0sImlzTmV3IjpmYWxzZSwiJGxvY2FscyI6e30sIiRvcCI6bnVsbCwiX2RvYyI6eyJfaWQiOiI2MDlkZDI0MWU3MjhjMDBmNTI3ZmI0ZDUiLCJuYW1lIjoidGVzdCB0aOG7rSIsImVtYWlsIjoidGhhbmhodW5nLmNvZGVAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkMVZtSkZwWUY0ZVpKOVljZThjUldwZUxoRHVFczBqNFNoa1k3Y0R4MEIyaFJ0N0ZETjVkTUciLCJjcmVhdGVkQXQiOiIyMDIxLTA1LTE0VDAxOjI4OjMzLjIyMloiLCJ1cGRhdGVkQXQiOiIyMDIxLTA1LTE0VDAxOjI4OjMzLjIyMloiLCJfX3YiOjB9LCIkaW5pdCI6dHJ1ZSwiYXV0aG9yaXphdGlvbiI6InVzZXIiLCJpYXQiOjE2MjA5NTkzNjcsImV4cCI6MTYyMDk2Mjk2N30.5D_LO8ajileRV_76Un8PBWUdfX5G6hFXwZyux_2z6hM
 *                                          refresh:
 *                                              type: string
 *                                              description: refresh token của user dùng để xác thực lấy access token giao tiếp với app
 *                                              example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwiX2lkIjoiNjA5ZGQyNDFlNzI4YzAwZjUyN2ZiNGQ1Iiwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwibmFtZSI6ImluaXQiLCJfaWQiOiJpbml0IiwiY3JlYXRlZEF0IjoiaW5pdCIsInVwZGF0ZWRBdCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfaWQiOnRydWUsIm5hbWUiOnRydWUsImVtYWlsIjp0cnVlLCJwYXNzd29yZCI6dHJ1ZSwiY3JlYXRlZEF0Ijp0cnVlLCJ1cGRhdGVkQXQiOnRydWUsIl9fdiI6dHJ1ZX0sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiLCJpZ25vcmUiXX0sInBhdGhzVG9TY29wZXMiOnt9LCJjYWNoZWRSZXF1aXJlZCI6e30sIiRzZXRDYWxsZWQiOnt9LCJlbWl0dGVyIjp7Il9ldmVudHMiOnt9LCJfZXZlbnRzQ291bnQiOjAsIl9tYXhMaXN0ZW5lcnMiOjB9LCIkb3B0aW9ucyI6eyJza2lwSWQiOnRydWUsImlzTmV3IjpmYWxzZSwid2lsbEluaXQiOnRydWUsImRlZmF1bHRzIjp0cnVlfX0sImlzTmV3IjpmYWxzZSwiJGxvY2FscyI6e30sIiRvcCI6bnVsbCwiX2RvYyI6eyJfaWQiOiI2MDlkZDI0MWU3MjhjMDBmNTI3ZmI0ZDUiLCJuYW1lIjoidGVzdCB0aOG7rSIsImVtYWlsIjoidGhhbmhodW5nLmNvZGVAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkMVZtSkZwWUY0ZVpKOVljZThjUldwZUxoRHVFczBqNFNoa1k3Y0R4MEIyaFJ0N0ZETjVkTUciLCJjcmVhdGVkQXQiOiIyMDIxLTA1LTE0VDAxOjI4OjMzLjIyMloiLCJ1cGRhdGVkQXQiOiIyMDIxLTA1LTE0VDAxOjI4OjMzLjIyMloiLCJfX3YiOjB9LCIkaW5pdCI6dHJ1ZSwiYXV0aG9yaXphdGlvbiI6InVzZXIiLCJpYXQiOjE2MjA5NTkzOTEsImV4cCI6MTYyMTIxODU5MX0.Ui-195Qc_2bCnq1pGA-naeDOUwuLkrbiNa045wfAGvQ
 *                  
*/
let refresh = async (req, res) => {
    // User gửi mã refresh token kèm theo trong body
    const { token } = req.body
    let response = {},
        code     = 500

    if ( !token ) {
        // Không tìm thấy token trong request
        code = 403
        throw new Error('No token provided.')
    }
    // Nếu như tồn tại token thì giải mã
    try {
        // Verify kiểm tra tính hợp lệ của cái refreshToken và lấy dữ liệu giải mã decoded 
        const user = await jwtHelper.verifyTokenRefresh( token )

        /// convert user object
        let   userModel = new User(user)
        const access    = jwtHelper.generateTokenAccess( userModel.toResources() ),
              refresh   = token // jwtHelper.generateTokenRefresh( userModel.toResources() )

        /// response 
        response.code    = 200
        response.data    = { access, refresh }
        response.message = response.internal_message = "Login Successful"
        return res.status(response.code).json(response)
    } catch (error) {
        
        response.code    = code || 403
        response.message = response.internal_message = error.message //'Invalid refresh token.'
        return res.status(response.code).json(response)
    }
}

/**
 * @swagger
 *  /api/v1/register:
 *      post:
 *          summary: đăng ký user ( name - email - password - gender )
 *          description: register thành công trả về đối tượng user đã đăng ký vào hệ thống
 *          tags: [ user ]
 *          parameters:
 *              - in: body
 *                name: name
 *                schema:
 *                  type: string
 *                  example: trương thanh hùng
 *                required: true
 *                description: tên của user phải có độ dài từ 2 đến 100 kí tự
 *              - in: body
 *                name: email
 *                schema:
 *                  type: string
 *                  example: jbtruongthanhhung@gmail.com
 *              - in: body
 *                name: password
 *                schema:
 *                  type: string
 *                  example: admin123
 *              - in: body
 *                name: confirm
 *                schema:
 *                  type: string
 *                  example: admin123
 *          responses:
 *              200:
 *                  description: A single user.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                 code:
 *                                      type: integer
 *                                      description: chỉ định mã lỗi để FE handle
 *                                      example: 200
 *                                 data: 
 *                                     $ref: '#/components/schemas/UserResources'
 *                      
 *                  
*/
let register = async (req, res) => {

    const { name, email, password, confirm, gender } = req.body
    let response = {},
        code     = 500

    /// code use async - await
    try {
        // Insert the new user if they do not exist yet
        let user = new User({ name, email, password, confirm, gender })

        const salt          = await bcrypt.genSalt(10)
              user.password = await bcrypt.hash(user.password, salt)
        /// save user to db mongo
        await user.save()
        /// response 
        response.code    = 200
        response.data    = { ... user.toResources() }
        response.message = response.internal_message = "thành công"
        return res.status(response.code).json(response)
    } catch (error) {

        response.code    = code || 500
        response.message = response.internal_message = error.message
        return res.status(response.code).json(response)
    }
}

module.exports = {
    login,
    refresh,
    register,
}