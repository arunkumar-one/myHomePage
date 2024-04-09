const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');
const express = require('express'); 
const { error } = require('console');
const os = require('os');
const homePath = os.homedir();

console.log("HomePath : " + homePath);

const app = express(); 

const PORT = process.env.PORT;

const filePath = homePath +'/pageAccessCount.json';

function incrementPageAccessCount(res) {
    
    if (!fs.existsSync(filePath)) {
        let obj = { ac : 1, from : new Date() };

        fs.writeFile(filePath, JSON.stringify(obj), (err) => {
            if (err) {
                console.error('Error saving value:', err);
                return;
            }
        });

    }
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading value:', err);
            return;
        }
        let obj = {};
        obj= JSON.parse(data);
        obj.ac += 1;

        fs.writeFile(filePath, JSON.stringify(obj), (err) => {
            if (err) {
                console.error('Error saving value:', err);
                return;
            }
        });
    });
    return;
}

function myHandler(req, res, next)
{
	res.removeHeader('ETag');
  incrementPageAccessCount(res);
  next();
}

function getAccessCountApi(req, res, next) {
    fs.readFile(filePath, 'utf8', (err, data) => { // Use fs.readFile with a callback function
        if (err) {
            console.error('Error reading value:', err);
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Internal Server Error');
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(data);
            res.end();
        }
    });
}

app.use('/accessCountApi',myHandler);
app.use('/getAccessCountApi',getAccessCountApi);

app.use(express.static(path.join(__dirname,"..","frontend", 'build')));

function errorhandler(error, port, protocol)
{
    if(!error) 
    {
        console.log(protocol+"Server is Successfully Running,  and App is listening on port "+ port) ;
    }
    else 
    {
        console.log("Error occurred, server can't start", error); 
    } 
}

console.log("Port "+ PORT);

if (PORT == undefined) 
{
    let port;
    const options = {
        key: fs.readFileSync('/etc/letsencrypt/live/arunkumarkg.com/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/arunkumarkg.com/fullchain.pem'),
    };
    
    const httpsServer = https.createServer(options, app);
    httpsServer.listen(443, (error) => errorhandler(error,443,"https")); 

    const httpServer = http.createServer(options, app);
    httpServer.listen(80, (error) => errorhandler(error,80,"http"))
}
else
{   
    const httpServer = http.createServer({}, app);
    httpServer.listen(PORT, (error) => errorhandler(error,PORT,"http"))
    // app.listen(PORT, (error) => errorhandler(error,port,"http"));    
}
