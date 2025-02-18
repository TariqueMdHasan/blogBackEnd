const express = require('express');
const router = express.Router();
const {
    createComment, 
    updateComment, 
    deleteComment, 
    getCommentById, 
    getCommentByBlogId 
} = require('../controllers/commentController.js')
const protect = require('../middleware/authMiddleware.js')


router.post('/create/:id', protect, createComment)
router.put('/update/:id', protect, updateComment)
router.delete('/delete/:id', protect, deleteComment)
router.get('/:id', getCommentById)
router.get('/blog/:id', getCommentByBlogId) 





module.exports = router
