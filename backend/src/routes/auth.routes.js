const express = require("express");
const userModel = require("../models/user.model");
const authRouter = express.Router();
const crypto = require("crypto")
const jwt = require("jsonwebtoken")



authRouter.post("/register",async (req, res) => {
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
    }process.env.JWT_SECRET,{ expiresIn: "1d"})
    res.cookie("token", token)

})