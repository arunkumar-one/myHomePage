const fs = require('fs');
const express = require('express'); 
const app = express(); 

const PORT = 3000; 
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
  next('route')
}

app.use('/index.css',myHandler);


app.use('/',express.static('public'));


app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running,  and App is listening on port "+ PORT) 
    else 
        console.log("Error occurred, server can't start", error); 
    } 
); 
