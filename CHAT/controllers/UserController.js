const User = require("../models/User")

/**
 * @swagger
 *  /api/v1/users:
 *      get:
 *          summary: danh sách user
 *          description: danh sách user 
 *          tags: [ user ]
 *          parameters:
 *              - in: query
 *                name: token
 *                schema:
 *                  type: string
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDlkZDI0MWU3MjhjMDBmNTI3ZmI0ZDUiLCJuYW1lIjoidGVzdCB0aOG7rSIsImVtYWlsIjoidGhhbmhodW5nLmNvZGVAZ21haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMS0wNS0xNFQwMToyODozMy4yMjJaIiwidXBkYXRlZEF0IjoiMjAyMS0wNS0xNFQwMToyODozMy4yMjJaIiwiYXV0aG9yaXphdGlvbiI6InVzZXIiLCJpYXQiOjE2MjA5NjEzMjcsImV4cCI6MTYyMDk2NDkyN30.BmGsxMue-ey1rBqQLHqkLm2e7DxLYDVvtvMgnolhs6o
 *                description: token access để định danh user này là ai
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: 
 *                              properties:
 *                                 code:
 *                                      type: integer
 *                                      description: chỉ định mã lỗi để FE handle
 *                                      example: 200
 *                                 data: 
 *                                     type: array
 *                                     items:
 *                                          type: object
 *                                          $ref: '#/components/schemas/UserResources'
 *                      
 *                  
*/
let users = async (req, res) => {

    let response = {},
        code     = 500

    /// code use async - await
    try {
        let users = await User.find({})
            users = users.map( item => item.toResources() )
        /// response 
        response.code    = 200
        response.data    = users
        response.message = response.internal_message = "thành công"
        return res.status(response.code).json(response)
    } catch (error) {

        response.code    = code || 500
        response.message = response.internal_message = error.message
        return res.status(response.code).json(response)
    }
}


module.exports = {
    users,
}