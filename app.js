
const express = require("express");

const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));


app.get("/",function(req,res){

    res.sendFile(__dirname + "/signup.html");
})

app.post("/",function(req,res){



    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const merge = {
      FNAME1 :firstName,
      LNAME1 :lastName,

    }
    const data = {
      members :[
        {
          email_address : email,
          status : "subscribed",
          merge_fields : merge
        }
      ]
    };

    const jsondata = JSON.stringify(data);

    console.log(jsondata);

    const url = "https://us21.api.mailchimp.com/3.0/lists/9eec54c476";
    const options = {
      method : "POST",
      auth : "pruthviraj:key"
    }

    const request = https.request(url,options,function(response){
      response.on("data", function(data){
        //console.log(JSON.parse(data));
        if(response.statusCode === 200){
          res.sendFile(__dirname + "/success.html");
        }else{
          res.sendFile(__dirname + "/failure.html");
        }
      })
    })

    request.write(jsondata);
    request.end();


});


app.post("/failure.html",function(req ,res){
    res.redirect("/");
})

app.listen(process.env.PORT,function(){
  console.log("Server started on port 3000");
});


///API key
//46720e7690e278dde9f97818c6c60918-us21

//Audience ID
//9eec54c476.
