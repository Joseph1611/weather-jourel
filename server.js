// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express=require('express')

// Start up an instance of app
const app=express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors =require('cors')
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port=9000
const server=app.listen(port,message)
function message (){
    console.log(`Your port is running at ${port}`)
}

//setup of post rout 
app.post('/tokenData',function(req,res){
  //here objects inside  project data with input values 
    projectData={
        temp:req.body.temp,
        Userfelling:req.body.Userfelling,
        date:req.body.date

    }
    res.send(projectData)
})

//setup of get route
app.get('/sendData',function(req,res){
    //here we will send the data with input value 
res.send(projectData)
})


 
