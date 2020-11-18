const http = require('http');
const url = require('url');
const port = 80;

var versionNumber = "V 0.0.0.1";

const fs = require('fs');

const curAction        = "/curAction";
const addAction        = "/addAction";
const info             = "/info";
const SelectADevice    = "/device";
const Type             = "/selectTypeOfPersistance";
const nonPerm          = "/nonperm";
const    Perm          = "/perm";

var devices_MACS            	= [];
var devices_NickNames         = [];
var devices_BSODCNT           = [];

http.createServer((req, res) => {
    let content = '';

    const urlObj = url.parse(req.url, true);

    pathN = urlObj.pathname;

    console.log(pathN);

    var AddAction = false;

    //
    if(!devices_MACS.includes(urlObj.query.deviceID)) {
      devices_MACS     .push(urlObj.query.deviceID);
      devices_NickNames.push("Unnamed");
      devices_BSODCNT  .push(0);
    }
    
//    /newBSOD?deviceID=234
    
    if(pathN === "/newBSOD") {
        if(urlObj.query.deviceID) {
            console.log(`Client MAC: ${urlObj.query.deviceID}`);
            var indx = devices_MACS.indexOf(`${urlObj.query.deviceID}`);
            content = `CurJob: ${devices_NickNames[indx]}`;
            devices_BSODCNT[indx] = devices_BSODCNT[indx] + 1; 
        } else {
            content  = `Server Version: ${versionNumber}`;
        }

        res.writeHead(200, {
            'content-type': 'text/html;charset=utf-8',
        });
        
        res.write(content);
        res.end();
    }
    else if(pathN === SelectADevice) {
     	content += `<script>setTimeout(function(){location.reload()},${msRefreshCooldown});</script>`;
     	        
        var i = 0;
        devices_MACS.forEach(r => {
            content  += `<form action="${Type}" method="get"><input type="hidden" id="deviceID" name="deviceID" value=${r}><input type="submit" value="${r} - ${devices_NickNames[i]}"></form>`;
            i = i + 1;
        });

        
        res.write(content);
        res.end();
    }

})
.listen(port);
