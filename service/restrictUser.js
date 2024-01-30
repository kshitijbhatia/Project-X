const jwt = require('jsonwebtoken')

const restrictToLoggedInUserOnly = async (req,res,next) =>{
    try{
        const token = req.headers.token
        console.log("Here's the token : ", token)
        if (token === null) {
            return res.status(401).json({ msg: 'Unauthorized - Missing token' });
        }
        
        jwt.verify(token, 'TVSM', (err, decoded) => {
            if (err) {
                return res.status(401).json({ msg: 'Unauthorized - Invalid token' });
            }

            const expirationDate = new Date(decoded.exp * 1000);
            const localExpirationDate = expirationDate.toLocaleString();
            console.log('Token expires at (local time):', localExpirationDate);
            console.log('Decoded Token:', decoded);
            
        });
        next();
    }catch(err){
        console.log("Error")
    }
}
  
module.exports = {
    restrictToLoggedInUserOnly
}