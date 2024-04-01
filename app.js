const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const { url } = require("inspector");
const { options } = require("request");
const { link } = require("fs");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req,res){
    res.sendFile(__dirname +"/signup.html");
})

app.post("/",function(req,res){
    var FirstName=req.body.fname;
    var LastName=req.body.lname;
    var Email=req.body.email;
   var data ={
       members:[
           {
                email_address :Email,
                status : "subscribed",
                merge_fields :{
                    FNAME : FirstName,
                    LNAME : LastName,

                }
           }
       ]
   };
   var JSONdata=JSON.stringify(data);
   const url = 'https://us9.api.mailchimp.com/3.0/lists/4a48eef2b7';
   const options={
       method: "POST",
       auth:"Snehil:f531c70179972b92716b74c9e029f8ca-us9"
   }
  const request= https.request(url,options,function(response){

    if(response.statusCode===200){
        res.sendFile(__dirname +"/success.html");
        
    }
    else{
        res.sendFile(__dirname +"/failure.html");
    }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
   });
   request.write(JSONdata);
   request.end();

})

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000");
})


// f531c70179972b92716b74c9e029f8ca-us9

// list Id
// 4a48eef2b7


// link
// https://polar-ridge-78996.herokuapp.com/