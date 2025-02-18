const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary'); 

const cloudinary = require('../config/cloudinary.js');

const blogStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'blogImages',
        format: async (req, file) => 'png', 
        public_id: (req, file) => `${Date.now()}-${file.originalname}`
    }
})

const profileStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'profilePictures',
        format: async (req, file) => 'png', 
        public_id: (req, file) => `${Date.now()}-${file.originalname}`
    }
});


const uploadBlogImage = multer({ storage: blogStorage });
const uploadProfilePicture = multer({ storage: profileStorage });


module.exports = { uploadBlogImage, uploadProfilePicture };