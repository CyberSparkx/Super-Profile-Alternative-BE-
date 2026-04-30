const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const connectDB = require('./src/db/db');
const {registerRoute , loginRoute} = require('./src/routes/auth.route');
dotenv.config();


// Db connection
connectDB();

// Middleware
app.use(cookieParser());
app.use(express.json());

//routes

// health check
app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Server is healthy' });
});

// auth routes
app.use('/api/auth', registerRoute );
app.use('/api/auth', loginRoute );

const PORT = process.env.PORT || 3000;
app.listen(PORT,() =>{
    console.log("server is running on http://localhost:3000");
    
});