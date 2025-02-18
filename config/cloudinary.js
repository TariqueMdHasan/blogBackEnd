const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv')

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

// const testCloudinaryConnection = async () => {
//     try {
//         const result = await cloudinary.api.ping();
//         console.log("✅ Cloudinary Connected Successfully!", result);
//     } catch (error) {
//         console.error("❌ Cloudinary Connection Failed!", error);
//     }
// };

// testCloudinaryConnection();


module.exports = cloudinary;
