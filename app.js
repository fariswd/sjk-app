const express = require('express');
const session = require('express-session')
const bodyParser  = require('body-parser');


const index   = require('./routers/index');
const user    = require('./routers/user');
const login   = require('./routers/login');
const vehicle    = require('./routers/vehicle');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(session({
  secret: 'secret'
}))

app.use(express.static(__dirname + '/views'));

app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine

// ------------ INDEX --------------
app.use('/', index);
// ------------- USER --------------
app.use('/users', user);
app.use('/login', login)

// ------------ VEHICLE -------------
app.use('/vehicles', vehicle);

app.listen(3000, function() {
  console.log('Sudah Nyambung ....!!!');
})
