const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    if(url === '/') {
        fs.readFile("./index.html", function(err, data){    //this wil read the file and keep it in data 
            res.writeHead(200, {'Content-Type': 'text/html'});  // writeHead returns/set the status code to the browser showing succes or failure
            res.write(data);                                    //and also this will send a collection of headers to the browser
            return res.end(); //write() will send the response body to the browser in form of whatever type specified i.e the html page to show in the client side.
          });       //res.end() will show that the the response header and the body is sent to the client browser.
    }
    else if(url === '/matchesPlayedperYear.html') {
        fs.readFile("./matchesPlayedperYear.html", function(err, data){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
             res.end();
          });
    }
    else if(url === '/matchesPlayedperYear') {
        fs.readFile("../output/matchesPlayedPeryear.json", function(err, data){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
             res.end();
          });
    }
    else if(url === '/matchesWonPerYear.html') {
        fs.readFile("./matchesWonPerYear.html", function(err, data){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
          });
    }
    else if(url === '/matchesWonPerYear') {
        fs.readFile("../output/matchesPerYear.json", function(err, data){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
          });
    }
    else if(url === '/extraRuns.html') {
        fs.readFile("./extraRuns.html", function(err, data){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
          });
    }
    else if(url === '/extraRuns') {
        fs.readFile("../output/extraRunsperTeam.json", function(err, data){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
          });
    }
    else if(url === '/economicBowler.html') {
        fs.readFile("./economicBowler.html", function(err, data){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
          });
    }
    else if(url === '/economicBowler') {
        fs.readFile("../output/economicBowler.json", function(err, data){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
          });
    }
});
server.listen(3000);