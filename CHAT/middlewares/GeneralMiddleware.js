let setAllowOrigin = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
}
let formatJsonApi = ( req, res, next ) => {
    res.setHeader('Content-Type', 'application/json')
    next()
}


module.exports = {
    formatJsonApi,
    setAllowOrigin,
}