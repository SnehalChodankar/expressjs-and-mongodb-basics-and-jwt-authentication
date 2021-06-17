const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv/config');

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/home');
const adminRoutes = require('./routes/admin');

const app = express();

//Below line is inserted in order to allow json data type to be received in req parameter...
app.use(express.json());

//Using routes written in different file (./routes/*)
app.use('/', userRoutes);
app.use('/auth/', authRoutes);
app.use('/home/', homeRoutes);
app.use('/admin/', adminRoutes);

app.listen('4000', ()=>{
    console.log('Server is Running!');
});

mongoose.connect(process.env.MONGODB, {useNewUrlParser: true, useUnifiedTopology: true} , (err)=>{
    if(err){
        return console.log(err.message);
    }
    console.log("Mongodb connected!!!");
});
