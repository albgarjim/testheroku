var express      = require('express');
var server_Info  = require('./serverLibs/serverInfo.js');
var page_creator = require('./serverLibs/pageCreator.js');
var ml           = require('./serverLibs/mylogger.js');
var url = require('url')
var request = require('request')
const PORT = process.env.PORT || 8080
const clId = process.env.clientId || 123;
const clSe = process.env.clientSecret || 234;

var total = clId + ':' + clSe;

// var authorizationBasic = $.base64.btoa(clientId + ':' + clientSecret);
var authorizationBasic = new Buffer(total).toString('base64');



var app = express();
app.use(express.static(__dirname + "/static"));

    
// =========================== HANDLE REQUESTS ===========================

app.get('/v1/results.json', function(req, res){
    //var parsedContent = JSON.parse(req.query);
    var query = url.parse(req.url).query
    var obj = JSON.parse(decodeURIComponent(query))

var fs = require('fs');
var ocio;
fs.readFile(__dirname + '/static/ocio.json', 'utf8', function (err, data) {
    if (err) throw err;
    ocio = JSON.parse(data);
});

var segu;
fs.readFile(__dirname + '/static/seguridad.json', 'utf8', function (err, data) {
    if (err) throw err;
    segu = JSON.parse(data);
});

var contam;
fs.readFile(__dirname + '/static/contam.json', 'utf8', function (err, data) {
    if (err) throw err;
    contam = JSON.parse(data);
});


request({
    headers: {
      'Authorization': 'Basic ' + authorizationBasic,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    uri: 'https://api.idealista.com/oauth/token',
    body: "grant_type=client_credentials&scope=read",
    method: 'POST'
  }, function (err, res, body) {
    var response = JSON.parse(body);


    urla = "https://api.idealista.com/3.5/es/search?locale=es&maxItems=20&numPage=1&operation=rent&order=distance&propertyType=homes&sort=asc&apikey=" + clId + "&t=13690631207690.9876595329247525&language=es&locationId=0-EU-ES-28&preservation=good&newDevelopment=true&width=140&height=105"

    request({
        headers: {
          'Authorization': 'Bearer ' + response.access_token,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: urla,
        body: "grant_type=client_credentials&scope=read",
        method: 'POST'
      }, function (err, res, body) {
        console.log(body);
            fs.writeFile(__dirname + '/static/data1.json', JSON.stringify(result), (err) => {
            if (err) {
                console.error(err);
                return;
            }
            });
  });
});



var result = [];
var api;
fs.readFile(__dirname + '/static/data.json', 'utf8', function (err, data) {
    if (err) throw err;
    api = JSON.parse(data);

    for (var i = 0; i < ocio.length; i++){
        look = ocio[i];

        for (var i = 0; i < api.elementList.length; i++){
            if(api['elementList'][i].hasOwnProperty('price')){
                var elem = api.elementList[i];
                if(elem.district == look){

                    result.push(elem);
                    api['elementList'][i] = ' ';


                }  
            }
        
        }

    }
    for (var i = 0; i < api.elementList.length; i++){
        var elem = api.elementList[i];
        if(api['elementList'][i].hasOwnProperty('price')){
            result.push(elem);
        }
    
    }
    fs.writeFile(__dirname + '/static/object.json', JSON.stringify(result), (err) => {
    if (err) {
        console.error(err);
        return;
    }
    });
    //console.log(result);
    res.end();


});






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
