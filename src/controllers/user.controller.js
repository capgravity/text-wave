import User from "../models/user.model.js";
import getDefaultProfilePic, { isProfilePicBroken } from "../utils/getDefaultProfilePic.js";


export const getUsersForSideBar = async (req,res) =>{
    try{
        const loggedInUserId= req.user._id;
        const filteredUsers= await User.find({_id:{ $ne: loggedInUserId}})
			.select("-password")
			.lean(); //give all users except the current logged in one

		const usersWithProfilePic = filteredUsers.map((user) => ({
			...user,
			profilePic: isProfilePicBroken(user.profilePic)
				? getDefaultProfilePic({ username: user.username, gender: user.gender })
				: user.profilePic,
		}));

        res.status(200).json(usersWithProfilePic);
    }
    catch(error){
        console.error("Error in getUsersForSideBar", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}