var requestUrl="/effie/sample/${param}";
//var replaceRequestParamater_InResponse=true;
var reqHeaderReplace=true;
var reqHeaderObjTOresponseMapping={"sessionId":"${sessionId}"}

var reqQueryReplace=true;
var reqQueryObjTOresponseMapping={"age":"${age}","city":"${city}"}

var reqParamsReplace=true;
var reqParamsObjTOresponseMapping
//Response Parameters
var responseStatuscode=500;
var responseHeaders={"Content-Type":"application/json"}

//Paste the actual response in single line
var responseObj={"Domain":"Sample","Name":"Praveen","AccountNumber":"${reqParam}","SessionID":"${sessionId}","Age":"${age}","City":"${city}"}

var s1="/effie/account/${param}";
var s2="/effie/account/1234";

splits1=s1.split("/'");
console.log(splits1);

module.exports={responseObj,responseStatuscode,responseHeaders}