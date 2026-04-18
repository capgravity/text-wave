import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js"
import getDefaultProfilePic, { isProfilePicBroken } from "../utils/getDefaultProfilePic.js";
export const signup = async (req, res) => {
    try {
        const { fullname, username, password, confirmedPassword, gender } = req.body;
        if(password!=confirmedPassword){
            return res.status(400).json({error: "Passwords do not Match!"})
        }

        const user= await User.findOne({username});

        if(user){
            return res.status(400).json({error: "User already exists!"})
        }
        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);

        const profilePic = getDefaultProfilePic({ username, gender });
        const newUser= new User({
            fullname,
            username,
            password:hashedPassword,
            gender,
            profilePic
        })
        if(newUser){
            //Generate JWT token
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            profilePic: newUser.profilePic
        });
        }
        else{
            res.status(500).json({error: "Invalid User Data"});
        }

        

    }
    catch (error) {
        console.log("Error in signup controller",error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const login = async (req, res) => {
    // console.log("login user");
    try{
        const {username, password} = req.body;
        const user= await User.findOne({username});
        const isPasswordCorrect= await bcrypt.compare(password, user?.password||"");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid username or password"})
        }

        generateTokenAndSetCookie(user._id, res);

        const shouldFixProfilePic = isProfilePicBroken(user.profilePic);
        const profilePic = shouldFixProfilePic
			? getDefaultProfilePic({ username: user.username, gender: user.gender })
			: user.profilePic;

		if (shouldFixProfilePic) {
			await User.updateOne({ _id: user._id }, { $set: { profilePic } });
		}

        return res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic,
        });
    }
    catch(error){
        console.log("Error in login controller",error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const logout = async (req, res) => {
    try{
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message: "Logged out successfully"})

    }catch(error){
        console.log("Error in logout controller",error.message)
        res.status(500).json({error: "Internal Server Error"});
    }
}
