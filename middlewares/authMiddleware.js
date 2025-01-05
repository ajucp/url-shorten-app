const { OAuth2Client }=require('google-auth-library');
const client=new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const authenticateGoogle=async(req,res,next)=>{
    const token=req.body.token;         //the google Id token will bw sent in req.body
    console.log('token recived:',token)
    if(!token){
        return res.status(400).json({message:"No token Provided."});
    }

    try {
        // console.log('hai')
        const ticket=await client.verifyIdToken({
            idToken:token,
            audience:process.env.GOOGLE_CLIENT_ID,
            // audience:1026441499569-u4mc55p9vf7dg8fsivvqa6uqnhmner8t.apps.googleusercontent.com
            
        });
        // console.log('idtoken:',idToken);
        // console.log('audi:',audience)
        // console.log('Ticket:', ticket); 
        const payload=ticket.getPayload();
        console.log('payload:',payload)
        req.user=payload;                   //attach the user info to the req
        next();
    } catch (err) {
        return res.status(400).json({message:"Invalid Google token."})
    }
}

module.exports=authenticateGoogle;