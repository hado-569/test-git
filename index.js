//require
require('dotenv').config();
console.log(process.env.SESSION_SECRET);
const express= require('express'); 
const bodyParser= require('body-parser'); 
const shortId = require('shortid');
const cookieParser = require('cookie-parser');

const db= require('./db');
var routeUser= require('./Route/user.route');
var routeLogin= require('./Route/login.route');
var routeProduct= require('./Route/product.route');
var loginMiddleWare= require('./middleWares/login.middleWare');

const app= express();
const port = 3000;


app.set('view engine', 'pug');
app.set('views','./views');

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'))
	
	db.defaults({users: [] })
	  .write();



app.get('/', loginMiddleWare.requireLogin, (req, res) => res.render('index')); 

app.use('/login',routeLogin);
app.use('/users', loginMiddleWare.requireLogin, routeUser);
app.use('/products', loginMiddleWare.requireLogin, routeProduct);

app.listen(port,()=> console.log("Webbrowser listening at http://localhost: " + port));


