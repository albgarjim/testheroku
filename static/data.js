var fs = require('fs');
var ocio;
fs.readFile('./ocio.json', 'utf8', function (err, data) {
    if (err) throw err;
    ocio = JSON.parse(data);
});

var segu;
fs.readFile('./seguridad.json', 'utf8', function (err, data) {
    if (err) throw err;
    segu = JSON.parse(data);
});

var contam;
fs.readFile('./contam.json', 'utf8', function (err, data) {
    if (err) throw err;
    contam = JSON.parse(data);
});

var result = [];
var api;
fs.readFile('./data.json', 'utf8', function (err, data) {
    if (err) throw err;
    api = JSON.parse(data);
    console.log(api['elementList'][0]);

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
    fs.writeFile("./object.json", JSON.stringify(result), (err) => {
    if (err) {
        console.error(err);
        return;
    }
    });
    //console.log(result);


});
