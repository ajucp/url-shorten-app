const authService=require('../services/authS')

exports.loginWithGoogle=async(req,res,next)=>{
    console.log('hai')
    try {
        const googleUser=req.user;          //user info atatched by middleware
        const token=await authService.loginWithGoogle(googleUser);
        res.status(200).json({token});
    } catch (err) {
        res.status(400).json({message:err.message})
    }
};
