const express = require('express')
const morgan = require('morgan');

const app = express()

const router = require('./routes/authRoute');

//Set View Engine
app.set('view engine', 'ejs');
app.set('views', 'views');


//middleware
const middlewares  = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended: true}),
    express.json()
];


app.use(middlewares)

app.use('/auth', router)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is Running : http:localhost:${PORT}`))