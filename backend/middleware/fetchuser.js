const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'Krishisagoodb$oy';

//middleware is a function that comes in the middle of the request and response cycle,here it used to fetch the user in any endpoint required 
const fetchuser=(req,res,next)=>{
    //Get the token from the request header 
    const token=req.header('auth-token')
    if(!token){
        res.status(401).send({error:"Please autheticate using a valid token"})
    }
    try {
        const data=jwt.verify(token,JWT_SECRET_KEY);
        //Get the user from the jwt token and add id to req object
        req.user=data.user;
        //next() that means the function after middleware at the endpoint
        next();
        
    } catch (error) {
        res.status(401).send({error:"Please autheticate using a valid token"})
        
    }


}
module.exports=fetchuser
