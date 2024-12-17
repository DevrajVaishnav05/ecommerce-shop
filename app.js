const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const db = require('./config/mongoose-connection');
app.use(express.json());

app.use(cookieParser()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
require("dotenv").config();
const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const shopRouter = require('./routes/shopRouter');
const expressSession = require("express-session");
const flash = require('connect-flash');
app.use(flash());
app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret:process.env.EXPRESS_SESSION_SECRET,
    })
);

app.use("/owners", ownersRouter);
app.use("/shop", shopRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.get("/",function(req,res){
    res.render("login");
  })
  app.get("/register",function(req,res){
    res.render("register");
  })
  app.get("/adminlogin",function(req,res){
    res.render("adminlogin");
  })

app.listen(3000);