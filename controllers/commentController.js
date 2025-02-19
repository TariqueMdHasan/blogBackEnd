
const mongoose = require('mongoose')
const Comment = require('../models/comments.models.js')


// create
const createComment = async (req, res) => {
    try {
        const { text } = req.body;
        const userId = req.user._id;
        const blogId = req.params.id;
       

        if(!text || !blogId){
            return res.status(400).json({ message: 'Please enter all fields' })
        }

        if(!userId){
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const comment = new Comment({
            text,
            // blogId,
            // userId
            blog: new mongoose.Types.ObjectId(blogId), 
            user: new mongoose.Types.ObjectId(userId), 
        })
        await comment.save();
        return res.status(200).json({
            message: 'Comment created successfully',
            // comment: {
            //     text: comment.text,
            //     blogId: comment.blogId,
            //     userId: comment.userId
            // }
            comment
        })

    }catch(error){
        console.log(error, 'error in creating comment')
        return res.status(500).json({ message: 'Internal Server Error' })
    }

    
}



// update
const updateComment = async(req, res) => {
    try{
        const { text } = req.body;
        const commentId = req.params.id;
        const userId = req.user._id;
        if(!commentId){
            return res.status(400).json({ message: 'comment not found' })
        }
        if(!text ){
            return res.status(400).json({ message: 'Please enter all fields' })
        }
        if(!userId){
            return res.status(400).json({ message: 'Unauthorized' })
        }


        // const comment = await Comment.findOne({ _id: commentId, user: userId })
        const comment = await Comment.findOne({ _id: commentId, user: userId })

        if(!comment){
            return res.status(404).json({ message: 'Comment not found' })
        }

        // if(comment.userId.toString() !== userId.toString()){
        //     return res.status(401).json({ message: 'Unauthorized' })
        // }

        comment.text = text || comment.text;
        await comment.save()

        return res.status(200).json({
            message: 'Comment updated successfully',
            // comment: {
            //     text: comment.text,
            //     // blogId: comment.blogId,
            //     // userId: comment.userId
            //     blogId: comment.blog,
            //     userId: comment.user
            // }
            comment
        })




    }catch(error){
        console.log(error, 'error in updating comment')
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}



// delete
const deleteComment = async(req, res) => {
    try{
        const commentId = req.params.id;
        const userId = req.user._id;
        // const blogId = req.body.blogId;
        if(!commentId){
            return res.status(400).json({ message: 'Please provide comment id' })
        }
        if(!userId){
            return res.status(401).json({ message: 'Unauthorized' })
        }
        
        // const comment = await Comment.findOne({ _id: commentId, userId })
        const comment = await Comment.findOne({ _id: commentId, user: userId })


        if(!comment){
            return res.status(404).json({ message: 'Comment not found' })
        }
        // if(comment.userId.toString() !== userId.toString()){
        //     return res.status(401).json({ message: 'Unauthorized' })
        // }

        await comment.deleteOne()
        return res.status(200).json({ message: 'Comment deleted successfully' })

    }catch(error){
        console.log(error, 'error in deleting comment')
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}


// get comment by id
const getCommentById = async(req, res) => {
    try{
        const commentId = req.params.id;
        if(!commentId){
            return res.status(400).json({ message: 'Please provide comment id' })
        }
        const comment = await Comment.findOne({ _id: commentId })
        if(!comment){
            return res.status(404).json({ message: 'Comment not found' })
        }
        return res.status(200).json({
            message: 'Comment found',
            comment: {
                text: comment.text,
                blogId: comment.blogId,
                userId: comment.userId
            }
        })

    }catch(error){
        console.log(error, 'error in getting comment')
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}


// get comment by blogId
const getCommentByBlogId = async(req, res) => {
    try{
        const blogId = req.params.id
        if(!blogId){
            return res.status(400).json({ message: 'Please provide blog id' })
        }
        const comments = await Comment.find({ blog: blogId })
        if(!comments){
            return res.status(404).json({ message: 'Comments not found' })
        }
        return res.status(200).json({
            message: 'Comments found',
            comments: comments
        })



    }catch(error){
        console.log(error, 'error in getting comment by blogId')
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}



// get comment by userId
const getCommentByUserId = async(req, res) => {
    try{
        const userId = req.params.id
        if(!userId){
            return res.status(400).json({ message: 'Please provide user id' })
        }

        const comments = await Comment.find({ user: userId })
        if(!comments){
            return res.status(404).json({ message: 'Comments not found' })
        }
        return res.status(200).json({
            message: 'Comments found',
            comments: comments
        })

    }catch(error){
        console.log(error, 'error in getting comment by userId')
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}





module.exports = { 
    createComment, 
    updateComment, 
    deleteComment, 
    getCommentById, 
    getCommentByBlogId,
    getCommentByUserId
}