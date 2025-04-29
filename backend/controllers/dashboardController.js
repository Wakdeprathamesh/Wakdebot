const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const getDashboardData = asyncHandler(async(req,res)=>{
    const {userId} = req.params;

    try{
        const user = await User.findById(userId);

        if(!user){
            res.status(404);
            return res.json({message : "User Not found"});
        }

        res.json({user});
    }
    catch{
        
    }
})