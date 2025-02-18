const User = require('../models/users.models.js')
const bcrypt = require('bcrypt')
const  { generateToken }  = require('../utils/tokenGenVerify.js')

const registerUser = async ( req, res) => {
    const {name, email, userName, password } = req.body
    const profilePicture = req.file ? req.file.path : null;

    if(!name || !email || !userName || !password){
        return res.status(400).json({message: "Please fill the data"})
    }

    const userExistsByEmail = await User.findOne({email})
    if(userExistsByEmail){
        return res.status(400).json({message: 'Email already exists'})
    }

    const userExistsByUserName = await User.findOne({userName})
    if(userExistsByUserName){
        return res.status(400).json({message: 'UserName taken'})
    }

    try {
        const user = await User.create({
            name,
            email,
            userName,
            password,
            profilePicture
        })
        const token = generateToken(user._id);
        return res.status(200).json({
            message: 'Account created successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                userName: user.userName,
                profilePicture: user.profilePicture,
            },
            token
        })
    }catch(error){
        console.error(error, 'Error creating account')
        return res.status(500).json({message: 'Something went wrong while creating account'})
        
    }
}

const loginUser = async(req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message: 'Please fill the data'})
    }

    try{
        let user;
        if(email){
            user = await User.findOne({email})
        }
        if(!user){
            return res.status(400).json({message: 'Invalid email'})
        }

        const userPassword = await bcrypt.compare(password, user.password);
        if(!userPassword){
            return res.status(400).json({message: 'Invalid password'})
        }

        const token = generateToken(user._id);
        return res.status(200).json({
            message: 'Login successful',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                userName: user.userName,
                profilePicture: user.profilePicture,
            },
            token
        })



    }catch(error){
        console.error(error, 'Error logging in')
        return res.status(500).json({message: 'Something went wrong while logging in'})
        
    }
}

const updateUser = async(req, res) => {
    const {name, email, userName, password } = req.body;
    const profilePicture = req.file ? req.file.path : null;
    if(!name || !email || !userName || !password){
        return res.status(400).json({message: 'Please fill the data'})
    }

    try{
        const user = await User.findById(req.user._id)
        if(!user){
            return res.status(400).json({message: 'User not found'})
        }

        if(userName) user.userName = userName;
        if(email) user.email = email;
        if(name) user.name = name;
        if(password) user.password = password;
        if(profilePicture) user.profilePicture = profilePicture;

        const updatedUser = await user.save();

        return res.status(200).json({
            message: 'User updated successfully',
            user: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                userName: updatedUser.userName,
                profilePicture: updatedUser.profilePicture,
            }
        })



    }catch(error){
        console.error(error, 'Error updating user')
        return res.status(500).json({message: 'Something went wrong while updating user'})
        
    }

}


const deleteUser = async(req, res) => {
    try{
        const user = await User.findById(req.user._id)
        if(!user){
            return res.status(400).json({message: 'User not found'})
        }
        await user.deleteOne();
        return res.status(200).json({message: 'User deleted successfully'})
    }catch(error){
        console.error(error, 'Error deleting user')
        return res.status(500).json({message: 'Something went wrong while deleting user'})
        
    }
}

const getUserData = async(req, res) => {
    try{
        const user = await User.findById(req.user._id)
        if(!user){
            return res.status(400).json({message: 'User not found'})
        }
        return res.status(200).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                userName: user.userName,
                profilePicture: user.profilePicture,
            }
        })
    }catch(error){
        console.error(error, 'Error fetching user data')
        return res.status(500).json({message: 'Something went wrong while fetching user data'})
        
    }
}


module.exports = {registerUser, loginUser, updateUser, deleteUser, getUserData}