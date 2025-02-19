const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please enter the title']
        },
        content: {
            type: String,
            required: [true, 'Please enter the content']
        },
        blogImages: {
            type: String,
            required: [true, 'Please enter the image']
        },
        catagory: {
            type: String,
            enum: [
                'Technology',
                'Health',
                'Fashion',
                'Food',
                'Travel',
                'Music',
                'Sports',
                'Education',
                'Business',
                'Entertainment',
                'Others',
            ],
            required: [true, 'Please select a category'],
            default: 'Others'

        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
)


module.exports = mongoose.model('Blog', blogSchema)