const http = require('http');
const url = require('url');
const port = 8080;

var versionNumber = "V 0.0.0.2";

const fs = require('fs');

const SelectADevice    = "/device";
const newBSOD          = "/newBSOD";
const    Perm          = "/perm";

var devices_ID            	= [];
var devices_NickNames         = [];
var devices_BSODCNT           = [];

http.createServer((req, res) => {
    let content = '';

    const urlObj = url.parse(req.url, true);

    pathN = urlObj.pathname;
        
    if(pathN === newBSOD) {
        if(!devices_ID.includes(urlObj.query.deviceID)) {
          devices_ID     .push(urlObj.query.deviceID);
          devices_BSODCNT  .push(0);
        }
        if(urlObj.query.deviceID) {
            console.log(`Client ID: ${urlObj.query.deviceID}`);
            var indx = devices_ID.indexOf(`${urlObj.query.deviceID}`);
            content = `CurJob: ${devices_ID[indx]}`;
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
    else {
      var i = 0;
      devices_ID.forEach(e => {
        content += `<h1>${devices_ID[i]} - ${devices_BSODCNT[i]}</h1> - <br>`;
        i = i + 1;
      });
      console.log(devices_ID);
      console.log(devices_BSODCNT);
       
      res.writeHead(200, {
        'content-type': 'text/html;charset=utf-8',
      });       
      res.write(content);
      res.end();
    }

})
.listen(port);
