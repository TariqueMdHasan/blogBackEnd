const jwt = require('jsonwebtoken')
const User =require('../models/users.models.js')
const {verifyToken} = require('../utils/tokenGenVerify.js')

const authMiddleware = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            const token = req.headers.authorization.split(' ')[1]
            if(!token){
                res.status(401).json({message: 'Unauthorized'})
            }
            const decoded = verifyToken(token)
            req.user = await User.findById(decoded.id).select('-password')
            if(!req.user){
                res.status(401).json({message: 'Unauthorized'})
            }
            next()
        }catch(error){
            res.status(401).json({message: 'Unauthorized'})
            console.error(error, 'Error in authMiddleware')
        }
    }else{
        res.status(400).json({message: 'Unauthorized'})
    }
}

module.exports = authMiddleware;