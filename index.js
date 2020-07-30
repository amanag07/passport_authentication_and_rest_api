const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const ejs = require('ejs')
const session = require('express-session')
const flash = require('connect-flash')
const initPassport = require('./config/passport-config')

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

initPassport(passport)

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false }));
app.use(express.json());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))
app.use(flash())

// Global variables
app.use((req,res,next) => {
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    res.locals.log_out = req.flash('log_out')
    res.locals.warning = req.flash('warning')
    res.locals.email_exist = req.flash('email_exist')
    next()
})

app.use(passport.initialize());
app.use(passport.session());

const postRoute = require('./routes/posts')
const userRoute = require('./routes/users')

// MIDDLEWARE
app.use('/posts',postRoute);
app.use('/',userRoute);


// ROUTES
app.get('/', (req,res) => {
    res.send('Home Page');
});

// CONNECT TO DB
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true,
      useUnifiedTopology: true 
    }, 
    () => {
    console.log('Connected to DB!');
});

// EXPRESS LISTEN TO PORT
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});