const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-stategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

app.use('/uploads' , express.static(__dirname + '/uploads'));
app.use(expressLayouts);

// extract style and scripts from sub pages into the layouts
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);



app.set('view engine' , 'ejs');
app.set('views' , './views');

app.use(session({
    name: 'RUSH',
    // TODO change the secrect before deployment
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/Rush_Development',
        autoRemove:'disabled' 
      },function(err){
        console.log(err || 'connect-mongodb setup ok');
      }
      )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticateduser);

app.use(flash());
app.use(customMware.setFlash);

app.use('/' , require('./routes'));

app.listen(port , function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});