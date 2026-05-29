const postModel = require("../models/post.model")
const ImageKit  = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,           
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})

async function createPostController(req, res){
    console.log(req.body, req.file)

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }

    let decoded= null

try {
     decoded = jwt.verify(token, process.env.JWT_SECRET)
} catch (error) {
    return res.status(401).json({message:"Invalid token"})
}
    

    const file = await imagekit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer),"file"),
        fileName: req.file.originalname,
        folder: "posts"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id
    })

    res.status(201).json({message:"Post created successfully", post})
}

module.exports = {
    createPostController
}