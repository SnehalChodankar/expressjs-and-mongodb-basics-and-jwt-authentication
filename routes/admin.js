const express = require('express');

const router = express.Router();

//Routes: get, post, patch, delete
router.get('/home', (req, res)=>{
    //sending response as normal message...
    //res.send("This is Home API");
    
    //sending response as json object...
    res.json({
        body:{
            message:'Admin Home API'
        }
    });
});

router.post('/add', (req, res)=>{
    //console.log("POST Route!");

    //Line below won't work until app.use(express.json()) is inserted on top of code...
    res.json(req.body);
});

module.exports = router;