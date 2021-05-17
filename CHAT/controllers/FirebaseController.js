const firebase     = require("firebase-admin"),
      Notification = require("../models/Notification"),
      User         = require("../models/User"),
      jwtHelper    = require("../helpers/jwt.helper")

/**
 * @swagger
 *  /api/v1/register/notification:
 *      post:
 *          summary: change notify jwt access
 *          description: phương thức này giống với refresh token dùng để thay thế token access mới thành 1 token có tham số access
 *          tags: [ notify ]
 *          parameters:
 *              - in: body
 *                name: token
 *                schema:
 *                  type: string
 *                  example: dCMmD7vzQICqZ-syV1W4JJ:APA91bHa0DGJFg6jA_2SwyCmIUM7JlDbc1ogZMWayQ7FkV_iId2-U063-bWgzHPsbeZITzNsDNhJbx1DdUc7d-F8zi6NXbGrb8DfgQ804lnIsqiYi8FH2ia6gCiApiwiEUHZq6KyPLTF
 *              - in: header
 *                name: x-access-token
 *                schema:
 *                  type: string
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwiX2lkIjoiNjA5ZGQyNDFlNzI4YzAwZjUyN2ZiNGQ1Iiwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwibmFtZSI6ImluaXQiLCJfaWQiOiJpbml0IiwiY3JlYXRlZEF0IjoiaW5pdCIsInVwZGF0ZWRBdCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfaWQiOnRydWUsIm5hbWUiOnRydWUsImVtYWlsIjp0cnVlLCJwYXNzd29yZCI6dHJ1ZSwiY3JlYXRlZEF0Ijp0cnVlLCJ1cGRhdGVkQXQiOnRydWUsIl9fdiI6dHJ1ZX0sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiLCJpZ25vcmUiXX0sInBhdGhzVG9TY29wZXMiOnt9LCJjYWNoZWRSZXF1aXJlZCI6e30sIiRzZXRDYWxsZWQiOnt9LCJlbWl0dGVyIjp7Il9ldmVudHMiOnt9LCJfZXZlbnRzQ291bnQiOjAsIl9tYXhMaXN0ZW5lcnMiOjB9LCIkb3B0aW9ucyI6eyJza2lwSWQiOnRydWUsImlzTmV3IjpmYWxzZSwid2lsbEluaXQiOnRydWUsImRlZmF1bHRzIjp0cnVlfX0sImlzTmV3IjpmYWxzZSwiJGxvY2FscyI6e30sIiRvcCI6bnVsbCwiX2RvYyI6eyJfaWQiOiI2MDlkZDI0MWU3MjhjMDBmNTI3ZmI0ZDUiLCJuYW1lIjoidGVzdCB0aOG7rSIsImVtYWlsIjoidGhhbmhodW5nLmNvZGVAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkMVZtSkZwWUY0ZVpKOVljZThjUldwZUxoRHVFczBqNFNoa1k3Y0R4MEIyaFJ0N0ZETjVkTUciLCJjcmVhdGVkQXQiOiIyMDIxLTA1LTE0VDAxOjI4OjMzLjIyMloiLCJ1cGRhdGVkQXQiOiIyMDIxLTA1LTE0VDAxOjI4OjMzLjIyMloiLCJfX3YiOjB9LCIkaW5pdCI6dHJ1ZSwiYXV0aG9yaXphdGlvbiI6InVzZXIiLCJpYXQiOjE2MjA5NTkzNjcsImV4cCI6MTYyMDk2Mjk2N30.5D_LO8ajileRV_76Un8PBWUdfX5G6hFXwZyux_2z6hM
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
 *                                      $ref: '#/components/schemas/NotificationResources'
 *                  
*/
let registerNotification = async (req, res) => {
    /// phương thức này giống với refresh token dùng để thay thế token access mới thành 1 token có tham số access
    // User gửi mã refresh token kèm theo trong body
    const { token, device } = req.body
    let response = {},
        code     = 500

    // Nếu như tồn tại token thì giải mã
    try {
        // Verify lấy dữ liệu giải mã decoded 
        const user = req.jwtUser

        /// convert user object
        let   userModel = new User(user)

        const userFirebase = {
            ...userModel.toResources(),
            firebase: token,
            device
        }
        const access    = jwtHelper.generateTokenAccess( userFirebase )

        /// create row record in collection notification
        let notify      = { token, device, user: userFirebase._id, access }
        

        let notifyModel = new Notification(notify)
            notify      = await notifyModel.save()

        /// response 
        response.code    = 200
        response.data    = { ...notify.toResources() }
        response.message = response.internal_message = "Firebase Successful"
        return res.status(response.code).json(response)
    } catch (error) {
        
        response.code    = code || 403
        response.message = response.internal_message = error.message //'Invalid refresh token.'
        return res.status(response.code).json(response)
    }
}



/**
 * controller firebase
 * @param {*} req 
 * @param {*} res 
 */
let firebaseNotification = (req, res) => {
    
    // const firebaseToken = 'c5TwrQawTQOmLonYOtjLIf:APA91bEht8pamauzE7_1zY0TYkp6E24kEKgKAuTVm1gtn9np7U1ffGSYwHuZ01wGU8sBq4uj6Gv_j5OUwcoUQ1GWfXfVghh-jRYFP-I55zw832fjRYBMcN8kD4Zip5yZyQ16izrjKEuJ'
    const firebaseToken = 'dCMmD7vzQICqZ-syV1W4JJ:APA91bHa0DGJFg6jA_2SwyCmIUM7JlDbc1ogZMWayQ7FkV_iId2-U063-bWgzHPsbeZITzNsDNhJbx1DdUc7d-F8zi6NXbGrb8DfgQ804lnIsqiYi8FH2ia6gCiApiwiEUHZq6KyPLTF'

    const payload = {
        notification: {
            title: 'Yêu em Hương Xinh đẹp',
            body: 'Hêlo bé hương cục cưng yêu dấu',
        }
    }
     
    const options = {
        priority: 'high',
        timeToLive: 60 * 60 * 24, // 1 day
    }

    firebase.messaging().sendToDevice(firebaseToken, payload, options)
    .then((response) => {
        // Response is a message ID string.
        return res.status(200).send("Notification sent successfully"+response)
    })
    .catch((error) => {
        return res.status(200).send("Notification sent fail" + error.message)
    })
}

module.exports = {
    registerNotification,
    firebaseNotification,
};