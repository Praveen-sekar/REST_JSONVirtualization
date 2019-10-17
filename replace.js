
var responseObj={"Domain":"Sample","Name":"${reqParam2}","AccountNumber":"${reqParam}","SessionID":"${sessionId}","Age":"${age}","City":"${city}"}

var dict={
    "requestHeaders":{
        "req.headers.sessionid":"${sessionId}"
    },
    "requestQueryParams":{
        "req.query.age":"${age}",
        "req.query.city":"${city}"
    },
    "requestUrlPath":{
        "xxx":"${reqParam}"
    },
    "requestBody":{
      "req.body.xx":"nil"
    }
}

var replaceParameters={
    "req.headers.sessionid":"${sessionId}",
    "req.query.age":"${age}",
    "req.query.city":"${city}"
}
//var dict=["reqHeaderReplace":"true","reqQueryReplace":"true","reqParamsReplace":"true"]
var keys=Object.keys(replaceParameters);
var values=Object.values(replaceParameters);
//console.log(Object.values(dict=true));
//console.log(keys.length,values.length)
//Object.keys(dict.requestQueryParams).length

//console.log(dict.requestQueryParams[0])

var str=JSON.stringify(responseObj);
//for (k=0;k<keys.length;k++){
 //  str=str.replace(values[k],keys[k]);
//}

var s1="/effie/account/${reqParam}/document/${reqParam2}";
var s2="/effie/account/1234/document/8087";

var splt=s1.split("/");
var splt2=s2.split("/");

for(n=1;n<splt.length;n++){
if(splt[n].startsWith("${")){
console.log("Index : "+n+" ,Matched :"+splt[n])
str=str.replace(splt[n],splt2[n])
}
}

console.log(str);