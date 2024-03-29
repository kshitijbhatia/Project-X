const User = require('../db/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const handleUserSignup = async (req,res,next) =>{
    try{
        const { name, email, password } = req.body;

        const emailExists = await User.findAll({where : {email : email}})
        
        const hashedPassword = await bcrypt.hash(password, 12);

        if(emailExists.length === 0){
            const response = await User.create({
                name : name, 
                email : email,
                password : hashedPassword
            })

            return res.status(200).json({msg : "User Successfully signed in!!"})
        }

        return res.status(401).json({msg : "Email Already Exists!!"})

    }catch(err){
        return res.status(500).json({msg : "Internal Server Error!!"})
    }
}


const handleUserLogin = async (req,res,next) =>{
    try{
        const { email , password } = req.body;

        const user = await User.findAll({ where : {email : email}})
        
        if(user.length === 0 ){
            return res.status(401).json({msg : "Invalid Email!!"});
        }

        try{
            const result = await bcrypt.compare(password, user[0].dataValues.password);
            if(result){
                const secretKey = 'TVSM'; 
                const expiresIn = '20s'; 

                const userData = {
                    email: user[0].dataValues.email,
                };

                const token = jwt.sign(userData, secretKey, { expiresIn });

                return res.status(200).json({msg : "Logged In!!", user : user[0].dataValues, token : token})
            }else{
                return res.status(401).json({ msg : "Invalid Password!! "})
            }
        }catch(err){
            console.error(err);
            return res.status(500).json({ msg: "Internal Server Error!! - 1" });
        }

    }
    catch(err){
        return res.status(500).json( { msg : "Intternal Server Error!! - 2"})
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}

