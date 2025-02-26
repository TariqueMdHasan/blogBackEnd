const express = require('express');
const router = express.Router();
const {registerUser, loginUser, updateUser, deleteUser, getUserData, getUserDataFromParams} = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
const { uploadProfilePicture } = require('../middleware/uploadMiddleware');

router.post('/register', uploadProfilePicture.single('profilePictures'), registerUser); 
router.post('/login', loginUser);
router.put('/update', protect, uploadProfilePicture.single('profilePictures'), updateUser);
router.delete('/delete', protect, deleteUser);
router.get('/getuserdata', protect, getUserData);
router.get('/user/:id', getUserDataFromParams)

module.exports = router;