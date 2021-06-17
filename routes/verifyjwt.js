const jwt = require('jsonwebtoken');

//middleware functions always takes 3 parameters
const verifyToken = (req, res, next) => {
    const token = req.headers['access-token'];

    if(!token)
        return res.send('Access denied');
    
    try{
        const verify = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verify;
        next();       
    }catch(err){
        res.status(401).send('Invalid Access token!!!')
    }
}

module.exports = verifyToken;