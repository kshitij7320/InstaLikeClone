const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imgUrl:{
        type:String,
        required:[true, "Image Url is Required"]
    },
    user:{
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
        required:[true, "User Id is Required"]
    }
})

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;