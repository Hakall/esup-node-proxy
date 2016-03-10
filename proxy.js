var fs = require('fs');
var httpProxy = require('http-proxy');
var properties = require(process.cwd() + '/properties/properties');
//
// Create the HTTPS proxy server in front of a HTTP server
//
var proxy = httpProxy.createServer({
  target: {
    host: properties.esup.otp_api_address,
    port: properties.esup.otp_api_port
  },
  ssl: {
    key: fs.readFileSync(process.cwd() + properties.esup.ssl_key, 'utf8'),
    cert: fs.readFileSync(process.cwd() + properties.esup.ssl_cert, 'utf8')
  }
});

// Listen for the `error` event on `proxy`.
proxy.on('error', function (err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  console.log(JSON.stringify(err));
  res.end('Something went wrong. '+JSON.stringify(err.code));
});

proxy.listen(properties.esup.proxy_port);