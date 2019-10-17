var http=require('http');
var fs=require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
var GETCtrl = require('./Controllers/GETController.js');
var POSTCtrl = require('./Controllers/POSTController.js');
//var res=require('./Response/Sample.js');

//console.log(res.responseObj);
//var urlConfig=require('./Configs/UrlPathConfig.json');

const port=3002
let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var replaceParameters={
    "req.headers.sessionid":"${sessionId}",
    "req.query.age":"${age}",
    "req.query.city":"${city}",
    "req.param.param":"${reqParam}"
}
var keys=Object.keys(replaceParameters);
var values=Object.values(replaceParameters);

var responseObj={"Domain":"Sample","Name":"Praveen","AccountNumber":"${reqParam}","SessionID":"${sessionId}","Age":"${age}","City":"${city}"}
var req.param.param="1234";
app.get('/*',function(req, res){

});

app.post('/*',function(req, res){
    var str=JSON.stringify(responseObj);
    for (k=0;k<keys.length;k++){
       str=str.replace(values[k],eval(keys[k]));
    }

    res.json(JSON.parse(str));
});


let server=app.listen(port, (err) => {
    if (err) {
      return console.log('something bad happened', err);
    }

    console.log(`Server is listening on http://localhost:${port}`);

  });