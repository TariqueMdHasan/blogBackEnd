const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Mogodb connected sucessfully');

    }catch(error){
        console.error('Mongodb connection failed', error.message)
        // Exit process with failure
        process.exit(1)
    }
}

module.exports = connectDB;