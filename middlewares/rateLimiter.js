//rateLImit Setting

// const rateLimit={};
const redisClient=require('../config/redis');


const rateLimiter=async(req,res,next)=>{
    const ip=req.ip;
    const currentTime=Date.now();
    const key=`rateLimit:${ip}`;
    const windowSize=3600000;       //1hr in millisec
    const maxRequests=10;

    try {
        //get the current req timestamps from redis
        let timestamps=await redisClient.lRange(key,0,-1);

        //filter timestamps older than window size
        timestamps=timestamps.filter((timestamps)=>currentTime-timestamps<windowSize);

        if(timestamps.length>=maxRequests){
            return res.status(429).json({message:'Rate limit exceeded.Try again later'});

        }

        // Add current timestamp to the list
        await redisClient.lPush(key,currentTime);

        if(timestamps.length===0){
            await redisClient.expire(key,windowSize/1000);      //TTL in sec

        }
        next();
    } catch (err) {
        console.error('Rate limiter error:',err);
        res.status(500).json({message:'Internal Server Error'});
    }

    // if(!rateLimit[ip]){
    //     rateLimit[ip]=[];
    // }

    // //filter out timestamps 1 hour ago
    // rateLimit[ip]=rateLimit[ip].filter((timestamp) => currentTime - timestamp < 3600000);

    // // limit 10 req per hour
    // if(rateLimit[ip].length >=10){
    //     return res.status(429).json({message:'Rate limit exceeded.Try again later.'});
    // }

    // rateLimit[ip].push(currentTime);
    // next();
};

module.exports=rateLimiter