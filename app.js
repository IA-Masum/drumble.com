const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')


//import routes
const autRoute = require('./routes/authRoute');

const app = express()


//Set View Engine
app.set('view engine', 'ejs');
app.set('views', 'views');


//middleware
const middlewares = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended: true}),
    express.json()
];


app.use(middlewares)

app.use('/auth', autRoute)


const PORT = process.env.PORT || 3000;

mongoose.connect(
    `mongodb+srv://Imran_ali:kBDDbrdXC3vT55k@cluster0.wkjey.mongodb.net/drumble?retryWrites=true";`,
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
)
    .then(() => {
        app.listen(PORT, () => {
            console.log('Db Connection Successful!');
            console.log(`Server is Running : http:localhost:${PORT}`)
        })
    })
    .catch(err => {
        return console.log(err)
    })

