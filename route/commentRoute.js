const express = require('express');
const router = express.Router();
const {
    createComment, 
    updateComment, 
    deleteComment, 
    getCommentById, 
    getCommentByBlogId,
    getCommentByUserId,
    getCommentCountByBlogId
} = require('../controllers/commentController.js')
const protect = require('../middleware/authMiddleware.js')


router.post('/create/:id', protect, createComment)
router.put('/update/:id', protect, updateComment)
router.delete('/delete/:id', protect, deleteComment)
router.get('/count/:id', getCommentCountByBlogId)
router.get('/user/:id', getCommentByUserId)
router.get('/blog/:id', getCommentByBlogId) 
router.get('/:id', getCommentById)





module.exports = router
