require('dotenv').config();
var jwt = require('jsonwebtoken');

function auth(req, res, next){
    const token = req.header('auth-token');
    if(!token){return res.status(401).send("Access denied")}
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next()
    } catch (error) {
        res.status(400).send({"invalid Token":error});
    }
};

module.exports = auth;