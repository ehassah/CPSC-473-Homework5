var http = require("http");
var fs = require("fs");
var extract = require("./extract");
var wss = require("./websockets-server");
// var mime = require("mime");
var mime = require('mime-types')

var handleError = function (err, res){
  // res.writeHead(404);
  // res.setHeader("Content-Type", "text/html");
// var mimeType = contentType.getValue().split(";")[0].trim();
var fileName = "error.html";
var type  = mime.contentType(fileName);
// console.log("mime type is "+ type);
  res.setHeader("Content-Type", type);
  fs.readFile(fileName, function(err, data){
    res.end(data);
    // window.location = fileName;
  });
};

var server = http.createServer(function (req, res){
  console.log("Responding to a request.");
  var filePath = extract(req.url);
  fs.readFile(filePath, function(err, data){
    if(err){
      handleError(err, res);
    return;
    }else{
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    }
  });
});
server.listen(3000);
