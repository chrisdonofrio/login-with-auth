var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;

var Sequelize = require('sequelize');
var sequelize = new Sequelize('', 'root');

var passport = require('passport');
var passportLocal = require('passport-local');

app.use(require('express-session')( {
 secret: '',
 cookie: { secure: false,
  maxAge: 1000 * 60 * 60 * 24 * 14
 },
 saveUninitialized: true,
 resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

var session = require('express-session');
var bcrypt = require('bcryptjs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

var expressHandlebars = require('express-handlebars');
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var Student = sequelize.define('Student', {
 email: {
  type: Sequelize.STRING,
  validate: {
   len: {
    args: [5,35],
   },
   isEmail: true
  },
  unique: true,
  allowNull: false
 },
 password: {
  type: Sequelize.STRING,
  validate: {
   len: {
    args: [6,15],
    msg: "Your password must contain 6-15 characters"
   }
  },
   allowNull: false
 },
 firstname: {
  type: Sequelize.STRING,
  validate: {
   len: {
    args: [1,30],
    msg: "You must havea first name"
   }
  },
  allowNull: false
 },
 lastname: {
  type: Sequelize.STRING,
  validate: {
   len: {
    args: [2,30],
    msg: "You must have a last name"
   }
  },
  allowNull: false
 }
}, {
 hooks: {
  beforeCreate: function(input){
   input.password = bcrypt.hashSync(input.password, 10);
  }
 }
});