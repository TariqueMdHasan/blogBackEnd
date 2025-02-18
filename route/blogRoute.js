const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { uploadBlogImage } = require('../middleware/uploadMiddleware');
const { 
    createBlog, 
    updateBlog, 
    deleteBlog, 
    getBlogById, 
    getAllBlogs,
    getAllBlogsByUser,
    getAllBlogsByRecent,
    getAllBlogsByCatagory,
    getAllBlogsByMostCommented
} = require('../controllers/blogController.js')

router.post('/create', protect, uploadBlogImage.single('blogImages'), createBlog);
router.put('/update/:id', protect, uploadBlogImage.single('blogImages'), updateBlog);
router.delete('/delete/:id', protect, deleteBlog);
router.get('/myBlogs', protect, getAllBlogsByUser);

router.get('/mostCommented', getAllBlogsByMostCommented);
router.get('/recent', getAllBlogsByRecent);
router.get('/catagory/:catagory', getAllBlogsByCatagory);



router.get('/:id', getBlogById);
router.get('/', getAllBlogs);


module.exports = router;