const jwt = require("jsonwebtoken");


const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token; // providujemo token u body u postman (Bearer ..)
    if(authHeader){
        const token = authHeader.split(" ")[1]; //drugi element posle BEarer-a
        jwt.verify(token, process.env.JWT_SECRET, (err,user) => {
            if(err) res.status(403).json("Token is not valid.");
            req.user = user;
            next(); //izlazi iz funkcije i ulazi u ruter
        });
    }else{
        return res.status(401).json("NOT AUTHENTICATED");
    }
};

const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        } else {
            res.status(403).json("You are not allowed to do that!");
        }
    });
};

const verifyTokenAndAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        } else {
            res.status(403).json("You are not allowed to do that!");
        }
    });
};

module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin};