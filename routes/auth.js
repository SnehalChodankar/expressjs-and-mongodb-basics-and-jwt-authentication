const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/User');

router.post('/login', async (req, res)=>{
    const user = await UserModel.findOne({email: req.body.email});
    if(!user){
        return res.send('Invalid Email!!!');
    }
    //res.send(user);

    const passwordVerification = await bcrypt.compare(req.body.password, user.password);
    if(!passwordVerification){
        return res.send('Invalid Password!!!');
    }
    //res.send(passwordVerification);

    //if you do not want to send the password along with other user details in the response,
    // then use the line below
    user.password = undefined;

    const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY);
    //res.send(token);
    res.json({
        body:{
            user:user,
            token: token
        }
    })

});


module.exports = router;