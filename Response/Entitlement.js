var delayrangeInmilliSeconds='10-150';

var replaceParameters={
    "req.headers.sessionid":"${sessionId}",
    "req.query.age":"${age}",
    "req.query.city":"${city}",
    "req.query.country":"${country}",
    "req.headers.name":"${name}"
}

var responseObj={"Domain":"EntitlmentDomain","Account":"${param2}","Name":"${name}","AccountNumber":"${param}","SessionID":"${sessionId}","Age":"23","City":"${city}","Country":"${country}"}

module.exports={responseObj,replaceParameters,delayrangeInmilliSeconds}