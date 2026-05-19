const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "User name Already Exists"],],
        unique:[true,"User name is Required"]
    },
    email: {
        type:String,
        required:[true, "Email is Required"],
        unique:[true,"Email is Already in Use"]
    },
    password: {
        type:String,
        required:[true, "Password is Required"]
    },
    bio: string,
    profileImage: {
        type:String,
        default:"https://ik.imagekit.io/diahojzql/istockphoto-1451587807-612x612.jpg"
    }})

    const userModel = mongoose.model("users", userSchema);

module.exports = userModel;        
