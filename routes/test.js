var csv = require('csv-array')

var file = '/home/pbl/bot-server/web-server/data/info.csv';
csv.parseCSV(file,function(data){
    console.log(JSON.stringify(data))
},false)
