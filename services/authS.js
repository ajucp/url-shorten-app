const jwt=require('jsonwebtoken');
const userModel=require('../models/userM');

const loginWithGoogle=async(googleUser)=>{
    // check the user is exist or not
    let user=await userModel.findUserByGoogleId(googleUser.sub);

    if(!user){
        // if no user create new user
        user=await userModel.createUser(googleUser);
    }

    // Genetrate jwt token for the user
    const token=jwt.sign(
        {userId:user._id,email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:'1h'}
    );

    return token
};

module.exports={loginWithGoogle};