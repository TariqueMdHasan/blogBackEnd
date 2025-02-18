const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    try{
        if(!process.env.JWT_SECRET){
            throw new Error('JWT secret not found in .env file')
        }
        return jwt.sign({id}, process.env.JWT_SECRET, {
            expiresIn: '90d'
        })
    }catch(error){
        console.error(error, 'Error generating token')
        throw new Error('Error generating token')
    }
}

const verifyToken = (token) => {
    try{
        if(!process.env.JWT_SECRET){
            throw new Error('JWT secret not found in .env file')
        }
        return jwt.verify(token, process.env.JWT_SECRET)
    }catch(error){
        console.error(error, 'Error verifying token')
        throw new Error('Error verifying token')
    }
}

module.exports = {generateToken, verifyToken}