const crypto=require('crypto');
const redisClient=require('../config/redis');
const {createShortUrl,findByAlias}=require('../models/urlM');



const generateAlias=()=>crypto.randomBytes(4).toString('hex');          //to generate random alias

const shortenUrl=async(longUrl,customAlias,topic)=>{
    let alias=customAlias || generateAlias();

    //check the alias is altready exist or not

    let existingUrl=await findByAlias(alias);

    while(existingUrl){
        alias=generateAlias();
        existingUrl=await findByAlias(alias);
    }

    const shortUrlData={
        longUrl,
        alias,
        topic,
        createdAt:new Date(),
    };
    
    const id=await createShortUrl(shortUrlData);            //store to databse

    //cache the alias with long url
    await redisClient.set(alias,longUrl,{EX:3600});         //setting the cache for 1 hr

    return {id,alias};

};

const getOriginalUrl=async(alias)=>{

    //check redis chace first
    const cacheUrl=await redisClient.get(alias);

    if (cacheUrl){
        console.log('cache hit for alias',alias);
        return{longUrl:cacheUrl,fromCache:true}
    }

    console.log("cache miss for alias",alias);

    // console.log('searching for alias:',alias);
    const result= await findByAlias(alias);

    if (result){
        await redisClient.set(alias,result.longUrl,{EX :3600 })
    }
    // console.log('result from db:',result)
    return result
};

module.exports={
    shortenUrl,
    getOriginalUrl
}