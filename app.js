const fs = require('fs');
const https = require('https');
const http = require('http');
const express = require('express'); 
const { error } = require('console');
const app = express(); 

const PORT = process.env.PORT;

const filePath = 'public/pageAccessCount.json';

function incrementPageAccessCount() {
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
        
        let obj= JSON.parse(data);
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
  incrementPageAccessCount();
  next();
}

app.use('/index.css',myHandler);


app.use('/',express.static('public'));

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
    port = 443;
    httpsServer.listen(port, (error) => errorhandler(error,port,"https")); 

    const httpServer = http.createServer(options, app);
    port = 80;
    httpServer.listen(port, (error) => errorhandler(error,port,"http"))
}
else
{   
    const httpServer = http.createServer({}, app);
    httpServer.listen(PORT, (error) => errorhandler(error,PORT,"http"))
    // app.listen(PORT, (error) => errorhandler(error,port,"http"));    
}