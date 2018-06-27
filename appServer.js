var express      = require('express');
var server_Info  = require('./serverLibs/serverInfo.js');
var page_creator = require('./serverLibs/pageCreator.js');
var ml           = require('./serverLibs/mylogger.js');
const PORT = process.env.PORT || 8080


var app = express();
app.use(express.static(__dirname + "/static"));

    
// =========================== HANDLE REQUESTS ===========================

app.get('/v1/results.json', function(req, res){
    console.log(req.query);
    const fs = require('fs');

    let student = {  
        name: 'Mike',
        age: 23, 
        gender: 'Male',
        department: 'English',
        car: 'Honda' 
    };

    let data = JSON.stringify(student);  
    fs.writeFileSync(__dirname + '/static/student-2.json', data);  
    res.end();
})

app.get('/', function(req, res) {
    ml.two('get /', 'Redirecting /home');
    res.redirect("/home");
    res.end();
});

app.get('/:page_name', page_creator.CreatePage);

//app.get('*', NotFound);

// =========================== FUNCTIONS ===========================


app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
