var http=require('http');
var fs=require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
const logger = require('./Configs/loggingConfiguration.js');
var GETCtrl = require('./Controllers/GETController.js');
var POSTCtrl = require('./Controllers/POSTController.js');
var uuid=require('uuid')
const port=3001
let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
//console.log(uuid('hello1.example.com', uuid.URL))

app.get('/*',function(req, res){
    var txnId=uuid.v1()
    logger.info("[txnId:"+txnId+"] Received incoming request-->"+req.method+":"+req.url);
    logger.info("[txnId:"+txnId+"] Calling GETController.js to match urlPath from file: UrlPathConfig.json");
    var [Msg,UrlPath,resFile,txnId] = GETCtrl.getUrlMatchingIndex(req,res,txnId);

    if(UrlPath!=null){

        logger.info("[txnId:"+txnId+"] Message : "+Msg+" and UrlPath is : "+UrlPath+",Response File : "+resFile);
        var response=require("./Response/"+resFile);
        var str=JSON.stringify(response.responseObj);
        var replaceKeys=Object.keys(response.replaceParameters);
        var replaceValues=Object.values(response.replaceParameters);
        var reqUrl=req.url;

        var baseUrl=reqUrl.split("?");
        var sourceReq=baseUrl[0].split("/");
        var configReq=UrlPath.split("/");

        for(n=1;n<sourceReq.length;n++){

            if(configReq[n].startsWith("${")){
                //console.log("Index : "+n+" ,Matched :"+configReq[n])
                str=str.replace(configReq[n],sourceReq[n])
            }
        }

        for(q=0;q<replaceKeys.length;q++){
             str=str.replace(replaceValues[q],eval(replaceKeys[q]))
        }
        //console.log(response.delayrangeInmilliSeconds);
        x=parseInt
        minDelay=parseInt(response.delayrangeInmilliSeconds.split("-")[0]);
        maxDelay=parseInt(response.delayrangeInmilliSeconds.split("-")[1]);
        randomDelay=Math.random()*(maxDelay-minDelay)+minDelay;

        setTimeout(sendResponse,randomDelay);

        function sendResponse(){
        logger.info("[txnId:"+txnId+"] Sending response-->"+str);
        res.json(JSON.parse(str));
        //console.log(str);
        }

    }else{

        logger.error("[txnId:"+txnId+"] Message : "+Msg);

        res.end("404 Not Found");

    }
});

app.post('/*',function(req, res){

    var [Msg,UrlPath] = POSTCtrl.getUrlMatchingIndex(req,res);

    if(UrlPath!=null){

        logger.info("Message : "+Msg+" and UrlPath is : "+UrlPath);

        res.end("Success");

    }else{

        logger.debug("Message : "+Msg);

        res.end("404 Not Found");

    }
});

let server=app.listen(port, (err) => {
    if (err) {

      return logger.debug('OOPS!! Something went wrong.', err);

    }

        logger.info(`Server is listening on http://localhost:${port}`);

  });


  //req.url : /effie/account/1234?a=123&b=789
  //req.params : /effie/account/1234
  //req.query : {"a":"123","b":"789"}
  //req.query.a : "123"
  //req.headers : Complete req header in JSON format
  //req.body : Complete body