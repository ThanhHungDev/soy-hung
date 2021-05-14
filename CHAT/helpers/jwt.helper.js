const jwt = require("jsonwebtoken");

// access token time life
const ACCESS_TOKEN_LIFE = process.env.ACCESS_TOKEN_LIFE || "1h"
// access token secret
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "testing-truong-thanh-hung"
// refresh token time life
const REFRESH_TOKEN_LIFE = process.env.REFRESH_TOKEN_LIFE || "3d"
// refresh token secret
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret-example"

/**
 * 
 * @param { object } user
 * @returns 
 */
let generateTokenAccess = user => {
    const payload = {
        ... user,
        authorization: 'user'
    }
    const options = {
        expiresIn: ACCESS_TOKEN_LIFE
    }
    // Thực hiện ký và tạo token
    return jwt.sign( payload, ACCESS_TOKEN_SECRET, options )
}
/**
 * 
 * @param { object } user
 * @returns 
 */
 let generateTokenRefresh = user => {
    const payload = {
        ... user,
        authorization: 'user'
    }
    const options = {
        expiresIn: REFRESH_TOKEN_LIFE
    }
    // Thực hiện ký và tạo token
    return jwt.sign( payload, REFRESH_TOKEN_SECRET, options )
}

/**
 * This module used for verify jwt token
 * @param { String } refresh
 */
let verifyTokenRefresh = refresh => {
    return new Promise((resolve, reject) => {
        jwt.verify( refresh, REFRESH_TOKEN_SECRET, (error, decoded) => {
            if (error) {
                return reject(error)
            }
            console.log (decoded)
            resolve(decoded)
        })
    })
}
/**
 * This module used for verify jwt token
 * @param { String } access
 */
 let verifyTokenAccess = access => {
    return new Promise((resolve, reject) => {
        jwt.verify( access, ACCESS_TOKEN_SECRET, (error, decoded) => {
            if (error) {
                return reject(error)
            }
            resolve(decoded)
        })
    })
}

module.exports = {
    generateTokenAccess,
    generateTokenRefresh,
    verifyTokenRefresh,
    verifyTokenAccess,
};