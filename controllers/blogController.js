const Blog = require('../models/blogs.models.js');

// create blog
const createBlog = async(req, res) => {
    try {
        // const { title, content, category, tags, author } = req.body;
        const { title, content, catagory } = req.body;

        const author = req.user._id;
        if(!author){
            return res.status(400).json({ message: 'Please login' });
        }
        

        if(!title || !content || !catagory){
            return res.status(400).json({ message: 'Please fill all fields' });
        }


        const blogImages = req.file ? req.file.path : null;

        if(!blogImages){
            return res.status(400).json({ message: 'Please upload an image' });
        }

        const newBlog = new Blog({
            title,
            content,
            blogImages,
            catagory,
            author
        });
        await newBlog.save();
        return res.status(200).json({
            message: 'Blog created successfully',
            blog: {
                _id: newBlog._id,
                title: newBlog.title,
                content: newBlog.content,
                blogImages: newBlog.blogImages,
                catagory: newBlog.catagory,
                author: newBlog.author
            }
        });
    } catch (error) {
        console.log(error, 'Error saving blog');
        return res.status(500).json({ message: 'error in saving' });
        
    }

}


// update blog
const updateBlog = async(req, res) => {
    try{
        const { title, content, catagory } = req.body;
        const author = req.user._id;
        const blogId = req.params.id;
        const blogImages = req.file ? req.file.path : null;


        if(!author){
            return res.status(400).json({ message: 'Please login' });
        }
        if(!blogId){
            return res.status(400).json({ message: 'Please provide blog id' });
        }
        
        const blog = await Blog.findById(blogId);

        if(!blog){
            return res.status(404).json({ message: 'Blog not found' });
        }

        if(blog.author.toString() !== author.toString()){
            return res.status(401).json({ message: 'You are not authorized to update this blog' });
        }

        blog.title = title || blog.title;
        blog.content = content || blog.content;
        blog.blogImages = blogImages || blog.blogImages;
        blog.catagory = catagory || blog.catagory;
        blog.updatedAt = Date.now();
        const updatedBlog = await blog.save();
        return res.status(200).json({
            message: 'Blog updated successfully',
            blog: {
                _id: updatedBlog._id,
                title: updatedBlog.title,
                content: updatedBlog.content,
                blogImages: updatedBlog.blogImages,
                catagory: updatedBlog.catagory,
                author: updatedBlog.author,
                updatedAt: updatedBlog.updatedAt
            }
        })

    }catch(error){
        console.log(error, 'Error updating blog');
        return res.status(500).json({ message: 'error in updating'})
    }
}



// delete blog
const deleteBlog = async(req, res) => {
    try{
        const author = req.user._id;
        const blogId = req.params.id;
        if(!author){
            return res.status(400).json({ message: 'Please login' });
        }
        if(!blogId){
            return res.status(400).json({ message: 'Please provide blog id' });
        }

        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.status(404).json({ message: 'Blog not found' });
        }

        if(blog.author.toString() !== author.toString()){
            return res.status(401).json({ message: 'You are not authorized to delete this blog' });
        }

        await blog.deleteOne();
        return res.status(200).json({ message: 'Blog deleted successfully' });

    }catch(error){
        console.log(error, 'Error deleting blog');
        return res.status(500).json({ message: 'error in deleting'})
    }
}



// get blog by id
const getBlogById = async(req, res) => {
    try{
        const blogId = req.params.id;
        if(!blogId){
            return res.status(400).json({ message: 'Please provide blog id' });
        }

        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.status(404).json({ message: 'Blog not found' });
        }

        return res.status(200).json({
            message: 'Blog found',
            blog: {
                _id: blog._id,
                title: blog.title,
                content: blog.content,
                blogImages: blog.blogImages,
                author: blog.author
            }
        })

        
    }catch(error){
        console.log(error, 'Error getting blog by id');
        return res.status(500).json({ message: 'error in getting by id'})
    }
}



// get all blogs
const getAllBlogs = async(req, res) => {
    try{
        const blogs = await Blog.find();
        if(!blogs){
            return res.status(404).json({ message: 'No blogs found' });
        }

        return res.status(200).json({
            message: 'All blogs found',
            blogs
        })
    }catch(error){
        console.log(error, 'Error getting all blogs');
        return res.status(500).json({ message: 'error in getting all blogs'})
    }
}



// get all blogs by auther/user
const getAllBlogsByUser = async(req, res) => {
    try{
        const author = req.user._id;
        // if (!mongoose.Types.ObjectId.isValid(id)) {
        //     return res.status(400).json({ message: 'Invalid blog ID' });
        // }
        
        if(!author){
            return res.status(400).json({ message: 'Please login' });
        }

        const blogs = await Blog.find({ author });
        if(!blogs){
            return res.status(404).json({ message: 'No blogs found' });
        }

        return res.status(200).json({
            message: 'All blogs by user found',
            blogs
        })
        

    }catch(error){
        console.log(error, 'Error getting all blogs by user');
        return res.status(500).json({ message: 'error in getting all blogs by user'})
    }
}




// get all blogs by recent
const getAllBlogsByRecent = async(req, res) => {
    try{
        const blogs = await Blog.find().sort({ createdAt: -1 });
        if(!blogs){
            return res.status(404).json({ message: 'No blogs found' });
        }

        return res.status(200).json({
            message: 'All blogs found',
            blogs
        })
    }catch(error){
        console.log(error, 'Error getting all blogs');
        return res.status(500).json({ message: 'error in getting all blogs'})
    }
}




// get all blogs by catagory
const getAllBlogsByCatagory = async(req, res) => {
    try{
        const catagory = req.params.catagory;
        const blogs = await Blog.find({ catagory });
        if(!blogs){
            return res.status(404).json({ message: 'No blogs found' });
        }

        return res.status(200).json({
            message: 'All blogs by catagory found',
            blogs
        })

    }catch(error){
        console.log(error, 'Error getting all blogs by catagory');
        return res.status(500).json({ message: 'error in getting all blogs by catagory'})
    }
}



// get all blogs by most commented
const getAllBlogsByMostCommented = async(req, res) => {
    try{
        const blogs = await Blog.find().sort({ comments: -1 });
        if(!blogs){
            return res.status(404).json({ message: 'No blogs found' });
        }

        return res.status(200).json({
            message: 'All blogs by most commented found',
            blogs
        })
    }catch(error){
        console.log(error, 'Error getting all blogs by most commented');
        return res.status(500).json({ message: 'error in getting all blogs by most commented'})
    }
}






module.exports = { 
    createBlog, 
    updateBlog, 
    deleteBlog, 
    getBlogById, 
    getAllBlogs,
    getAllBlogsByUser,
    getAllBlogsByRecent,
    getAllBlogsByCatagory,
    getAllBlogsByMostCommented
}




















// get all blogs by search
// get all blogs by pagination
// get all blogs by popular
// get all blogs by trending
// get all blogs by featured
// get all blogs by related
// get all blogs by recommended
// get all blogs by most liked
// get all blogs by most viewe
// get all blogs by most shared
// get all blogs by most saved
// get all blogs by most read
// get all blogs by most watched


