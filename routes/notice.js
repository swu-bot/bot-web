var express = require('express');
var csvToJson = require('convert-csv-to-json');

var router = express.Router();

const {PythonShell} = require('python-shell');

var csv = require('csv-array')

var file = '/home/pbl/bot-server/onyu-server/web-server/web-server/data/info.csv';
var pycode = '/home/pbl/bot-server/onyu-server/web-server/web-server/py/info_crawler.py'


PythonShell.run(pycode,null,function(err){
  if(err) throw err;
  console.log('py finished');
});

var temp = {
  "version": "2.0",
  "template": {
    "outputs": [
      {
        "listCard": {
          "header": {
            "title": ""
          },
          "items": [
            {
              "title": "",
            },
            {
              "title": "",
            },
            {
              "title": "",
            },
            {
              "title": "",
            },
            {
              "title": "",
            }
          ],
          "buttons": [
            {
              "label": "자세히 보기",
              "action": "webLink",
              "webLinkUrl": ""
            }
          ]
        }
      }
    ]
  }
}
function getData(param){
  return new Promise(resolve=>{
    csv.parseCSV(file,function(data){
      var arr = []
      for(var i=1;i<8;i++){
        arr.push(data[i][param])
      }
      console.log(arr);
      resolve(arr)
    },false)
  })
}

console.log(getData(0))




router.post('/getInfo/haksa', function(req, res) {

      (async()=>{
        //3:haksa 
        var data = await getData(4)
        temp.template.outputs[0].listCard.header = {"title":"학사공지"}
        for(var i=0;i<5;i++){
          temp.template.outputs[0].listCard.items[i] = {"title":data[i]}
        }
        temp.template.outputs[0].listCard.buttons[0].webLinkUrl='https://www.swu.ac.kr/www/noticea.html'
        
        res.status(200).send(temp);
      })()
      
});
router.post('/getInfo/janghak', function(req, res) {

  (async()=>{
    //1:janghak
    var data = await getData(1)
    temp.template.outputs[0].listCard.header = {"title":"장학공지"}
    for(var i=0;i<5;i++){
      temp.template.outputs[0].listCard.items[i] = {"title":data[i]}
    }
    temp.template.outputs[0].listCard.buttons[0].webLinkUrl='https://www.swu.ac.kr/www/noticeb.html'
    res.status(200).send(temp);
  })()
  
});
router.post('/getInfo/bongsa', function(req, res) {

  (async()=>{
    //0:bongsa
    var data = await getData(0)
    temp.template.outputs[0].listCard.header = {"title":"봉사공지"}
    for(var i=0;i<5;i++){
      temp.template.outputs[0].listCard.items[i] = {"title":data[i]}
    }
    temp.template.outputs[0].listCard.buttons[0].webLinkUrl='https://www.swu.ac.kr/www/noticee.html'
    res.status(200).send(temp);
  })()
  
});

router.post('/getInfo/hengsa', function(req, res) {

  (async()=>{
    //4:hengsa
    var data = await getData(4)
    temp.template.outputs[0].listCard.header = {"title":"행사공지"}
    for(var i=0;i<5;i++){
      temp.template.outputs[0].listCard.items[i] = {"title":data[i]}
    }
    temp.template.outputs[0].listCard.buttons[0].webLinkUrl='https://www.swu.ac.kr/www/noticec.html'
    res.status(200).send(temp);
  })()
  
});
router.post('/getInfo/cheayong', function(req, res) {

  (async()=>{
    //2:cheayong
    var data = await getData(2)
    temp.template.outputs[0].listCard.header = {"title":"채용공지"}
    for(var i=0;i<5;i++){
      temp.template.outputs[0].listCard.items[i] = {"title":data[i]}
    }
    temp.template.outputs[0].listCard.buttons[0].webLinkUrl='https://www.swu.ac.kr/www/noticed.html'
    res.status(200).send(temp);
  })()
  
});





module.exports = router;