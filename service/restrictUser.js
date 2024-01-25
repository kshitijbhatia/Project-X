const { getUser } = require('./auth')

const restrictToLoggedInUserOnly = async (req,res,next) =>{
    const userUid = req.cookies?.uid;

    if(!userUid){
        return res.status(401).json({msg : "Login First!!"})
    }

    const user = await getUser(userUid)
    
    if(!user){
        return res.status(401).json({msg : "Sign Up First!!"})
    }

    req.user = user;
    next();
}
 
module.exports = {
    restrictToLoggedInUserOnly
}