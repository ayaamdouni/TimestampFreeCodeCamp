// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const isInvalidDate = (date) =>{ return date.toUTCString() == "Invalid Date"}
// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  let date = new Date(req.params.date)
  // console.log(typeof(date.toUTCString()))
  if(isInvalidDate(date)){
    date = new Date(+req.params.date)
    // console.log(date)
  }
  
  if(isInvalidDate(date)){
    // console.log("ici")
    res.json({error: "Invalid Date"})
    return;
  }
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});


app.get('/api', (req, res)=>{
  date = new Date()
  res.json({unix: date.getTime(), utc: date.toUTCString() })
})

// app.get("/api/:date?",function(req, res){
//     const param = req.params.date  
//     if(! isNaN(Number(param))){
//       var d = new Date(Number(param))
//       res.json({unix: d.getTime(), utc: d.toUTCString() })
//     }
//     if(new Date(param)== "Invalid Date"){
//       res.json({error: "Invalid Date"})}
//     else if (new Date(param)){
//         var d = new Date(param)
//         res.json({unix: d.getTime(), utc: d.toUTCString() })
//       }      
// })




// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + 3000);
});
