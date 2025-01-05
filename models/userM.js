const {getDb}=require('../config/db');

const createUser=async(userData)=>{
    const db=getDb();
    const user={
        googleId:userData.sub,
        email:userData.email,
        // name:userData.name,
        // picture:userData.picture,
    };

    const result=await db.collection('users').insertOne(user);
    return result
};

const findUserByGoogleId=async(googleId)=>{
    const db=getDb();
    const user=await db.collection('users').findOne({googleId});
    return user;
};

module.exports={createUser,findUserByGoogleId}