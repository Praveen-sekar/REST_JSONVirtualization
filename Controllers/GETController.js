var urlConfig=require('../Configs/UrlPathConfig.json');

function getUrlMatchingIndex(req, res){

    var reqUrl=req.url;

    var Message=null;

    var baseUrl=reqUrl.split("?");

    var splitUrl=baseUrl[0].split("/");

    var matchingUrl=[],responseFile=[];

    var matchingIndex=-1;urlPath=null;resFile=null;

    //Check for matching request Url path length and UrlConfig endpoints length
    for (i = 0; i < urlConfig.GET.endpoints.length; i++) {

	    var source=urlConfig.GET.endpoints[i].requestUrl.split("/")

        if(source.length===splitUrl.length){

            matchingUrl.push(urlConfig.GET.endpoints[i].requestUrl);
            responseFile.push(urlConfig.GET.endpoints[i].responseFileName);

        }
    }
    console.log("Matching Url length : "+responseFile);

    //
    if(matchingUrl.length>0){

        var counter=[]

        for (i = 0; i < matchingUrl.length; i++) {

	        matchingUrlSplit=matchingUrl[i].split("/")

            var k=0

            for (j = 1; j < matchingUrlSplit.length; j++) {

		        if(splitUrl[j]===matchingUrlSplit[j] || matchingUrlSplit[j]==="${param}"){

                    k++

                    counter[i]=k

		        }

            }
        }

        //console.log(counter);

        var g=0;

        //console.log(splitUrl.length);

        for (m = 0; m < counter.length; m++) {

    	    if(counter[m]===splitUrl.length-1){

                matchingIndex=m

                g=g+1

            }
        }
        //console.log("G : "+g);
        if(g==1){

            Message="SUCESSFULLY matched Url";
            urlPath=matchingUrl[matchingIndex];
            resFile=responseFile[matchingIndex];
            //console.log("More than 1 Url path are matching")

        }else if(g==0){
            Message="ERROR-->UrlPath parameters not found !!!";
            //console.log("Url matched : "+matchingUrl[matchingIndex])

        }else{
            Message="ERROR-->More than one matching Url Found !!!";
            //console.log("Url matched : "+matchingUrl[matchingIndex])

        }
    //console.log(matchingIndex);

    }else{

        Message="ERROR-->Matching Url path length NOT FOUND !!!";

        //console.log(Message);

    }
    //console.log(g);
    return [Message,urlPath,resFile];
}

module.exports={getUrlMatchingIndex}
