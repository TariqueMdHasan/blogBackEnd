# Backend - MERN Blog App

This is the **backend** for the MERN Blog App, built with **Node.js, Express.js, and MongoDB**. It handles user authentication, blog management, comments, and Cloudinary image uploads.

Frontend github repo: https://github.com/TariqueMdHasan/Blogged

---

## 🛠 Tech Stack
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB + Mongoose** - Database & ORM
- **Cloudinary** - Image storage
- **JWT (JSON Web Token)** - Authentication
- **bcrypt.js** - Password hashing

---

## 📂 Folder Structure
```
backend/
│── models/         # Database models (User, Blog, Comment)
│── controllers/    # Business logic for API routes
│── routes/         # Express routes (user, blog, comment)
│── config/         # Configuration files (database, cloudinary)
│── middleware/     # Auth middleware (JWT verification)
│── .env           # Environment variables (not committed)
│── server.js      # Entry point
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/mern-blog-app.git
cd mern-blog-app/backend
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the `backend/` directory and add:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4️⃣ Start the Server
```bash
npm run dev
```
The server will run on `http://localhost:5000/`

---

## 📌 API Routes

### User Routes
| Method | Endpoint | Description |
|--------|--------------|----------------|
| POST   | `/api/users/register` | Register a new user |
| POST   | `/api/users/login` | Login user |
| GET    | `/api/users/profile` | Get user profile |
| PUT    | `/api/users/update` | Update user profile |

### Blog Routes
| Method | Endpoint | Description |
|--------|--------------|----------------|
| POST   | `/api/blogs` | Create a blog |
| GET    | `/api/blogs` | Get all blogs |
| GET    | `/api/blogs/:id` | Get a single blog |
| PUT    | `/api/blogs/:id` | Update a blog |
| DELETE | `/api/blogs/:id` | Delete a blog |

### Comment Routes
| Method | Endpoint | Description |
|--------|--------------|----------------|
| POST   | `/api/comments` | Add a comment |
| GET    | `/api/comments/:blogId` | Get comments for a blog |
| DELETE | `/api/comments/:id` | Delete a comment |

---

## 🔥 Future Enhancements
- **Like & Share Feature** ❤️📤
- **Search & Filter Blogs** 🔍
- **Role-Based Access Control (RBAC)** 🔑

---

## 🤝 Contributing
Pull requests and suggestions are welcome! Open an issue to discuss any improvements.

---

## 📨 Contact
For any questions, reach out via md.th.abdi@gmail.com .

