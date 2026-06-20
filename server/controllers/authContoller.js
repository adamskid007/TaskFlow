const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const registerUser = async (req,res) => {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({success: false, message: "All fields are required",});
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success: false, message: "Email already exists",
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)
        const user = await User.create({
            name,
            email,
            password:hashedPassword,
        });
        res.status(201).json({
            success: true,
            message: "User Registered successfully",
            user: {id:user._id,
            name: user.name,
            email: user.email,},
        });
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

const loginUser = async (req,res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({success:false, 
                message: "Email and Password is required",
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({success: false,
                message: "Invalid Email"
            });
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch) {
            return res.status(410).json({ success: false,
                message: "Password does not match"
            });
        }

        res.status(200).json({
            success: true,
            token: generateToken(user._id),
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
            }
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message})
    }
}
const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

module.exports = {registerUser,loginUser, getMe};