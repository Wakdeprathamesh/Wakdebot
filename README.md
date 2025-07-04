# WAKDEBOT

A modern web application built with React, TypeScript, and Node.js, featuring a full-stack architecture with a robust frontend and backend implementation.

## 🚀 Features

- Modern and responsive user interface
- Internationalization support (i18n)
- RESTful API backend
- User authentication and authorization
- Data visualization using Recharts
- Markdown support
- Secure API communication

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- Vite (Build tool)
- TailwindCSS (Styling)
- React Router (Navigation)
- i18next (Internationalization)
- Axios (API client)
- Recharts (Data visualization)
- React Markdown

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs (Password hashing)
- CORS support
- Environment variable configuration

## 📦 Installation

### Prerequisites
- Node.js (Latest LTS version)
- MongoDB (Make sure it's running locally or have a connection string)
- Git

### Setting up the Backend
1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the backend server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### Setting up the Frontend
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. For production build:
```bash
npm run build
```

## 🌐 Project Structure
├── frontend/
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── vite.config.ts
│
└── backend/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
└── server.js



## 🔒 Environment Variables

### Backend (.env)
- `PORT`: Server port number
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation

### Frontend (.env)
- `VITE_API_URL`: Backend API URL

## 🚀 Deployment

### Backend
1. Ensure all environment variables are properly set
2. Run `npm run build` to create a production build
3. Deploy the built files to your hosting service

### Frontend
1. Run `npm run build` to create a production build
2. Deploy the contents of the `dist` directory to your web hosting service

## 📝 API Documentation

The backend provides RESTful API endpoints for:
- User authentication (login/register)
- Protected routes using JWT
- Data operations (CRUD)

Detailed API documentation can be found in the backend/routes directory.



## 📄 License

This project is licensed under the ISC License.

## 👥 Author

- Prathamesh Wakde

 
 
