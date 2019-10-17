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

const port=3001
let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/*',function(req, res){

    var [Msg,UrlPath,resFile] = GETCtrl.getUrlMatchingIndex(req,res);
    console.log(resFile);
    if(UrlPath!=null){
        //var str = "Mr Blue has a blue house and a blue car";
        //var rep=str.replace("Blue","Praveen");
        var obj={"Name":"Blue","Age":"29"}

       // var jsonString = JSON.stringify(obj);
       // rep=jsonString.replace("Blue","Praveen");
        console.log("Message : "+Msg+" and UrlPath is : "+UrlPath+",Response File : "+resFile);
        var respon=require("./Response/"+resFile);
        var rplc=respon.responseObj;
        strg=JSON.stringify(rplc).replace("Praveen","Beulah");
        res.writeHead(respon.responseStatuscode,{"Content-Type":"application/json"});
        res.end(strg);
        var replaceParameters={
            "req.headers.sessionid":"${sessionId}",
            "req.query.age":"${age}",
            "req.query.city":"${city}",
            "xxx":"${reqParam}"
        }
        //var dict=["reqHeaderReplace":"true","reqQueryReplace":"true","reqParamsReplace":"true"]
        var keys=Object.keys(replaceParameters);
        var values=Object.values(replaceParameters);
        //console.log(keys[0]);
        console.log(req.headers.sessionid)

    }else{

        console.log("Message : "+Msg);

        res.end("404 Not Found");

    }
});

app.post('/*',function(req, res){

    var [Msg,UrlPath] = POSTCtrl.getUrlMatchingIndex(req,res);

    if(UrlPath!=null){

        console.log("Message : "+Msg+" and UrlPath is : "+UrlPath);

        res.end("Success");

    }else{

        console.log("Message : "+Msg);

        res.end("404 Not Found");

    }
});

let server=app.listen(port, (err) => {
    if (err) {
      return console.log('something bad happened', err);
    }

    console.log(`Server is listening on http://localhost:${port}`);

  });


  //req.url : /effie/account/1234?a=123&b=789
  //req.params : /effie/account/1234
  //req.query : {"a":"123","b":"789"}
  //req.query.a : "123"
  //req.headers : Complete req header in JSON format
  //req.body : Complete body