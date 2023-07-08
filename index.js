const express = require('express');
const swaggerDoc=require("swagger-ui-express")
const swaggerDocmentation=require("./rapper/documentation")
const mongoose = require('mongoose');
const csrf = require('csurf');
const  rateLimit = require('express-rate-limit')
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
var MemoryStore = require('memorystore')(expressSession)
const passport = require('passport');
const flash = require('connect-flash');


const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views',);
app.use("/documentations",swaggerDoc.serve)
app.use("/documentations",swaggerDoc.setup(swaggerDocmentation))

app.use('/static', express.static(__dirname + '/static'));
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
// Apply the rate limiting middleware to all requests
app.use(limiter)


app.use(express.urlencoded({ extended: true }));

const mongoURI = require('./config/monkoKEY');
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true, },).then(() => console.log("Connected !"),);

app.use(cookieParser('random'));

app.use(expressSession({
    secret: "random",
    resave: true,
    saveUninitialized: true,
    // setting the max age to longer duration
    maxAge: 24 * 60 * 60 * 1000,
    store: new MemoryStore(),
}));

app.use(csrf());
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function (req, res, next) {
    res.locals.success_messages = req.flash('success_messages');
    res.locals.error_messages = req.flash('error_messages');
    res.locals.error = req.flash('error');
    next();
});

app.use(require('./controller/routes.js'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log("Server Started At " + PORT));