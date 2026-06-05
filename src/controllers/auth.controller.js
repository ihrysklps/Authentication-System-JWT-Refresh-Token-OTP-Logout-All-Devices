import userModel from "../models/user.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config.js";



export async function register(req,res){
    const{username,email,password} = req.body;

    const isAlreadyRegistered = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(isAlreadyRegistered){
        res.status(409).json({
            message: "Username or email already exists"
        })
    }
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword
    })
//TOKEN CREATED
    const token = jwt.sign({
        id: user._id
    }, config.JWT_SECRET,
    {
        expiresIn : "30d"
    }
)
res.status(201).json({
    message:"user is registered successfully",
    user:{
        username: user.username,
        email: user.email,
    },
    token
})

}

export async function getMe(req,res){
    /** Two logic over here
     * How does server identifies which user is making the request
     * 
     */

    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({
            "message": "token not found"
        })
    }

    const decoded = jwt.verify(token,config.JWT_SECRET);

    const user = await userModel.findById(decoded.id)
    res.status(200).json({
        "message":"user fetched successfully",
        user:{
            username: user.username,
            email: user.email
        }

    })
}