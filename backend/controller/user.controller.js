import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie-parser";

export const register = async (req,res)=>{
    try{
    const {fullname, email, phoneNumber,password, role} = req.body;
    if(!fullname || !email || !phoneNumber || !password || !role){
        return res.status(400).json({
            message:'something is missing',
            success: false
        });
    }
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
        role
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

    const token = jwt.sign(tokenData,process.env.secret_accesstoken, {expiresIn:'1d'});

    user = {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNUmber: user.phoneNUmber,
        role: user.role,
        profile: user.profile
    }

    return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000, httpsOnly: true, sameSite: 'strict'}).json({
        message:`welcome back ${user.fullname}`,
        user,
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
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

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