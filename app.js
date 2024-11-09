const express = require("express");
const session = require('express-session');
const colours = require("./utilities/colours")
require('dotenv').config()



const dbConnect = require("./config/connect")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set('view engine','ejs')

const port = process.env.PORT

app.use("/",express.static('./public'))

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// ROUTES
app.use('/', require('./routes/client'))  // client 
app.use('/admin', require('./routes/admin')) //admin

dbConnect().then(() => {
    app.listen(port, () => {
        console.log(colours.magenta + 'server running ' + colours.black, port)
    })
}).catch((err) => {
    console.error('connection failed', err)
}); 





console.log("i am alive");
