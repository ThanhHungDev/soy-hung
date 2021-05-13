/**
 * controller firebase
 * @param {*} req 
 * @param {*} res 
 */
let firebaseNotification = (req, res) => {
    
    const firebaseToken = 'c5TwrQawTQOmLonYOtjLIf:APA91bEht8pamauzE7_1zY0TYkp6E24kEKgKAuTVm1gtn9np7U1ffGSYwHuZ01wGU8sBq4uj6Gv_j5OUwcoUQ1GWfXfVghh-jRYFP-I55zw832fjRYBMcN8kD4Zip5yZyQ16izrjKEuJ'

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
    firebaseNotification,
};