const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);


//import routes
const autRoute = require('./routes/authRoute');
const dashboardRoute = require('./routes/dashboardRoute');


//import middlewares
const {bindUserWithRequest} = require('./middlewares/authMiddleware')
const {setLocals} = require('./middlewares/setLocals');


const MONGODB_URI = `mongodb+srv://Imran_ali:kBDDbrdXC3vT55k@cluster0.wkjey.mongodb.net/drumble?retryWrites=true";`

var store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
    expires: 1000*60*60*2
});



const app = express()


//Set View Engine
app.set('view engine', 'ejs');
app.set('views', 'views');


//middleware
const middlewares = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended: true}),
    express.json(),
    session({
        secret: process.env.SECRET_KEY || 'SECRET_KEY',
        resave: false,
        saveUninitialized: false,
        store
    }),
    bindUserWithRequest(),
    setLocals()

];


app.use(middlewares)

app.use('/auth', autRoute)
app.use('/dashboard', dashboardRoute)


const PORT = process.env.PORT || 3000;

mongoose.connect(
    MONGODB_URI,
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
)
    .then(() => {
        app.listen(PORT, () => {
            console.log('Db Connection Successful!');
            console.log(`Server is Running : http://localhost:${PORT}`)
        })
    })
    .catch(err => {
        return console.log(err)
    })

