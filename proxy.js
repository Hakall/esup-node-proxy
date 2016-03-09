var fs = require('fs');
var httpProxy = require('http-proxy');

//
// Create the HTTPS proxy server in front of a HTTP server
//
httpProxy.createServer({
  target: {
    host: 'tequila',
    port: 3000
  },
  ssl: {
    key: fs.readFileSync(process.cwd() +'/certs/HTTPS.key', 'utf8'),
    cert: fs.readFileSync(process.cwd() +'/certs/HTTPS.cert', 'utf8')
  }
}).listen(3443);