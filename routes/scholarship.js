var express = require('express');
var router = express.Router();


router.post('/sdate',function(res,req){
 const responseBody = {
        version: "2.0",
        template: {
          outputs: [
            {
              simpleText: {
                text: "국가장학금 신청기간은2020.05.20(수) ~ 2020.06.18(목) 18:00 까지 입니다."
              }
            }
          ]
        }
      };
    
      res.status(200).send(responseBody);
});

module.exports = router;

