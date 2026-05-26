const userModel = require("../models/user.model");
const crypto = require("crypto")
const jwt = require("jsonwebtoken")




async function  registerController(req, res) {
    const { username, email, password, bio, profileImage } = req.body;

    const isUserAlreadyRegister = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(isUserAlreadyRegister){
        return res.status(409).json({
            message:"User already Registered" + (isUserAlreadyRegister.email == email ? "Email Already Exist" : "Username Already Exist")
        })
    }
    const hash = crypto.createHash('sha256').update(password).digest("hex")

    const user = await userModel.create({
        username,
        email,
        password:hash ,
        bio,
        profileImage
    })

    const token = jwt.sign({
        id: user._id
    },process.env.JWT_SECRET,{ expiresIn: "1d"})
    res.cookie("token", token)

    res.status(201).json({
        message:"User Registered Successfully",
        user:{
            email:user.email,
            username:user.username,
            bio:user.bio,
            profileImage: user.profileImage
        }
    })

}

async function loginController(req, res) {
    const { email, username, password } = req.body;

    const user = await userModel.findOne({
        $or:[
            {
                username: username
            },
            {
                email: email
            }
        ]
    })
    if(!user){
        return res.status(404).json({
            message:"User Not Found"
        })
    }
    const hash = crypto.createHash('sha256').update(password).digest("hex")

    const isPasswordValid= hash == user.password
    
    if(!isPasswordValid){
        return res.status(401).json({
            message:"Invalid Password"
        })
    }
    const token = jwt.sign({
        id: user._id
    },process.env.JWT_SECRET,{ expiresIn: "1d"})
    res.cookie("token", token)

    res.status(200).json({
        message:"User Logged In Successfully",
        user:{
            email:user.email,
            username:user.username,
            bio:user.bio,
            profileImage: user.profileImage
        }
    })  
}

module.exports = {
    registerController,
    loginController
}