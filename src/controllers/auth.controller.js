const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const registerController =  async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser){
            return res.status(400).json({ message : " User already exists "})
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password,10);
        // Create new user
        const newUser = new User({
            name,
            email,
            password : hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message : " User registered successfully "
        })

    } catch (error) {
        res.status(500).json({ message : " Server error "})
    }  
}

const loginController =  async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
			maxAge: 24 * 60 * 60 * 1000,
			path: "/",
			...(process.env.NODE_ENV === "production" && { partitioned: true }),
		 });
        res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

const loginWithTokenController = async (req,res) =>{
    try {
        const tocken = req.cookies.token;
        if (!tocken) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(tocken, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports= {
    registerController,
    loginController,
    loginWithTokenController
}