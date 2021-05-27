const fs           = require('fs'),
      path         = require('path'),
      http         = require('http'),
      https        = require('https'),
      express      = require('express'),
      bodyParser   = require('body-parser'),
      session      = require('express-session'),
      cors         = require('cors'),
      rateLimit    = require("express-rate-limit"),
      helmet       = require("helmet"),
      socket       = require('socket.io'),
      i18n         = require("i18n"),
      firebase     = require("firebase-admin"),
      fbcredential = require("./firebase-key-secret.json")

// Create global app object
var app = express()
require('dotenv').config()

firebase.initializeApp({
    credential: firebase.credential.cert(fbcredential)
})

/// my define
const CONFIG            = require('./config')
const PORT              = process.env.PORT || parseInt(CONFIG.SERVER.PORT)
const DOMAIN            = CONFIG.SERVER.ASSET()
const IS_PRODUCTION     = CONFIG.IS_ENVIROMENT_PRODUCT
const GeneralMiddleware = require('./middlewares/GeneralMiddleware')
const initSocketEvents  = require("./helpers/socket.event")
const initAPIs          = require("./routes/api")
const initWEBs          = require("./routes/web")
const mongoConnect      = require("./helpers/mongo.connect")

//// ============== begin config app ===================
const swaggerJsDoc = require("swagger-jsdoc"),
      swaggerUi    = require("swagger-ui-express")

const optiswaggerOptionssons = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'api chat v1',
            version: '1.0.0',
        },
    },
    apis: [ 
        "./routes/*.js", 
        "./controllers/*.js", 
        "./models/*.js", 
        './helpers/*.js' 
    ] // files containing annotations as above
};

const swaggerDocs = swaggerJsDoc(optiswaggerOptionssons)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))



const corsOptions = {
    origin: CONFIG.CORS_API
}
app.use(cors(corsOptions))
// Normal express config defaults
app.use(require('sanitize').middleware)

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))

app.use(session({
            secret: 'hungtt',
            cookie: {
                maxAge: 60000
            },
            resave: false,
            saveUninitialized: false
        }))

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 2000, // start blocking after 5 requests
    message: "Too many accounts created from this IP, please try again after an hour"
})
    
app.use(limiter)
app.use(helmet())
app.use(i18n.init)
i18n.configure({
    locales:['jp', 'vi'],
    directory: __dirname + '/locales',
    cookie: 'language',
})
//// ============== end config app ===================

/// setting directeries asset root 

app.use("", express.static(path.join(__dirname, 'public')))
/// view engine
app.set('view engine', 'ejs')
app.set('views', './views')

/// listener server
var server = null
if(PORT == 443){
    const options = {
        key: fs.readFileSync(path.join(__dirname, 'create-ssl/server.key')),
        cert: fs.readFileSync(path.join(__dirname, 'create-ssl/server.crt'))
    }
    server = http.createServer(options, app)
}else{
    server = http.createServer(app)
}
 
const io = socket(server,{ origins: CONFIG.CORS_IO })
server.listen(PORT,  () => {

    console.log(`server run: ${DOMAIN}`)  
    mongoConnect.connect()
    initSocketEvents(io)
})

app.use([  GeneralMiddleware.setAllowOrigin ])
/// set routes api
initAPIs(app)
/// set routes web
initWEBs(app)

// // respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send('hello world')
})
