import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie-parser";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req,res)=>{
    try{
    const {fullname, email, phoneNumber,password, role} = req.body;
    if(!fullname || !email || !phoneNumber || !password || !role){
        return res.status(400).json({
            message:'something is missing',
            success: false,
        });
    }

    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);


    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({
            message:'user already existed',
            success: false
        })
    }
    const hashPassword = await bcrypt.hash(password,10);

    await User.create({
        fullname,
        email,
        phoneNumber,
        password:hashPassword,
        role,
        profile:{
            profilePhoto: cloudResponse.secure_url,
        }
    });

    return res.status(201).json({
        message:"user created successfuly",
        success:true
    })

}catch(err){
    console.log(err)
}
}

export const login = async (req,res)=>{
    try {
    const {email , password , role} = req.body;
    if(!email ||!password || !role){
        return res.status(400).json({
            message:'something is missing',
            success:false
        });
    };

    let user = await User.findOne({email});
    if(!user){  
        return res.status(400).json({
            message:'there is no user with this email',
            success:false
        })
    }
    const isPasswordMatch = await bcrypt.compare(password , user.password);
    if(!isPasswordMatch){
        return res.status(400).json({
            message:'email or password not correct',
            success:false
        })
    }
    if(role != user.role){
        return res.status(400).json({
            message:"role isn't correct for this account ",
            success:false
        })
    }

    const tokenData = {
        id: user._id
    }

    const token = jwt.sign(tokenData,process.env.secret_accesstoken, {expiresIn:'10h'});

    user = {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile
    }

    return res.status(200).cookie("token",token,{ maxAge: 10 * 60 * 60 * 1000, httpOnly: true,     sameSite: 'None', secure: true }).json({
        message:`welcome back ${user.fullname}`,
        user,
        token,
        success:true
    })
} catch (error) {
        console.log(error)
}}


export const logout = async (req,res)=>{
    try {
        res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"you logout successfuly",
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}


export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;   
        const fileData = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileData.content,{resource_type: 'auto'});

        let skillsArray; 
        if (skills) {
            skillsArray = skills.split(",");
        }

        const userId = req.id;
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: 'there is no user',
                success: false
            });
        }

        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) {
            const phone = Number(phoneNumber);
            user.phoneNumber = phone;
        }
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;
        if (cloudResponse){
            let resumeUrl = cloudResponse.secure_url;
            user.profile.resume = resumeUrl;
            user.profile.resumeOriginalName = file.originalname;
        } 

        await user.save();

        const responseUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "profile updated successfully",
            user: responseUser,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
};



// export const updatePassword = async (req,res) => {
//     try {
//         const {id} = req.params;
//         const {password , newPassword} = req.body;
//         const user = User.findOne({id});
//         if(!user){
//             return res.status(400).json({
//                 message:"there is no user"
//             })
//         }
        
//     } catch (error) {
//         console.log(error)
//     }
// }