const path = require('path');
const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.urlencoded({extended: true}));   // this will make the body readable 
app.use(express.json());


// Path specific middlewares
// Works for: /result, /result/a, /result/a/b/direction: 
// Won't work for: /resulta
app.use('/result',(req,res,next)=>{
    console.log("Running Result Middleware");
    next();
})

let x = true;
// Generic middleware: Works for all reports
app.use((req,res,next)=>{
    console.log("Generic Middleware");
    if(x== false) return res.send("Not Allowed");
    next();
})

const isLoggedIn = require('./middlewares/isLoggedIn')

// Exact path match middleware
app.get('/',isLoggedIn,(req,res,next)=>{
    res.send("Hello world");
})

app.get('/result',(req,res,next)=>{
    res.send("Result Request recieved success")
})

app.listen(PORT, ()=>{
    console.log(`http://localhost:` + PORT);
})