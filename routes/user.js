const express = require('express');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/User');
const verifyToken = require('./verifyjwt');

const router = express.Router();

//Routes: get, post, patch, delete
router.get('/home', (req, res)=>{
    //sending response as normal message...
    //res.send("This is Home API");
    
    //sending response as json object...
    res.json({
        body:{
            message:'Home API'
        }
    });
});

router.post('/add', async (req, res)=>{
    //console.log("POST Route!");

    //schema for validation using @hapi/joi
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        email: Joi.string().min(5).email().required(),
        password: Joi.string().min(6).required()
    });

    const {error} = schema.validate(req.body);
    if(error)
        return res.send(error.details[0].message);

    //generate a salt for password hashing using bcrypt
    const salt = await bcrypt.genSalt(10);

    //generate the hashed password using the salt generated
    const hashedpassword = await bcrypt.hash(req.body.password, salt);

    //Line below won't work until app.use(express.json()) is inserted on top of code...
    //res.json(req.body);

    //sending data to mongodb
    const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: hashedpassword
    });
    //res.send(user);
    //user.save() will save the data inside the mongodb database.
    //user.save();

    //To receive a response back, there are 3 methods avaialable with .save()
    //Method 1: Callback function
    user.save(function(err, resp){
        if(err){
            return res.send(err);
        }
        res.send(resp);
    });

    //Method 2: Promises
    // user.save().then(resp=>{
    //     res.send(resp);
    // }).catch(err=>{
    //     res.send(err);
    // });

    //Method 3: try catch block
    //If we are using this method then we have to make use of await before saving the user.
    //also since await is added, the  function should also be made async, router.post('/add', async (req, res)=>{
    // const save = await user.save();
    // try{
    //     res.send(save);
    // }catch(err){
    //     res.send(err);
    // }
});

router.get('/all',verifyToken, async (req, res)=>{
    const users = await UserModel.find();
    try{
        res.send(users);
    }catch(err){
        res.send(err);
    }
});

router.get('/user/:id', async (req, res)=>{
    const user = await UserModel.findById(req.params.id);
    try{
        res.send(user);
    }catch(err){
        res.send(err);
    }
});

router.delete('/user/:id', async (req, res)=>{
    const deletedUser = await UserModel.deleteOne({
        _id:req.params.id
    });
    try{
        res.send(deletedUser);
    }catch(err){
        res.send(err);
    }
});

router.patch('/user/:id', async (req, res)=>{
    const updateUser = await UserModel.updateOne(
        {
            _id:req.params.id
        },
        {
            $set: req.body
        }
        //we can also write $set as 
        //  {
        //      $set : {
        //          name: req.body.name,
        //          email: req.body.email,
        //          password: req.body.password
        //      }
        //  }
    );
    try{
        res.send(updateUser);
    }catch(err){
        res.send(err);
    }
});

router.get('/token', (req, res)=>{
    const token = jwt.sign({_id:123123}, process.env.SECRET_KEY);
    res.send(token);
});

module.exports = router;