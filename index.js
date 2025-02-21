const express = require('express');
const dotenv = require('dotenv')
const bodyparser = require('body-parser');
const cors = require('cors')

const cloudinary = require('./config/cloudinary.js');

const connectDB = require('./config/db.js')
const userRoute = require('./route/userRoute.js')
const blogRoute = require('./route/blogRoute.js')
const commentRoute = require('./route/commentRoute.js')





const app = express();

dotenv.config();
connectDB();
app.use(cors())
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));


const PORT = process.env.PORT || 5000;

app.use('/api/outh', userRoute)
app.use('/api/blog', blogRoute)
app.use('/api/comment', commentRoute)


app.get('/', (req, res)=>{
    res.send('Hellowwwwwwwww TArique')
})

app.listen(PORT, (req, res)=>{
    console.log('Server is running on port 5000')
})