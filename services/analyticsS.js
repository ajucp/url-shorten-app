const {getAnalyticsByAlias, getAnalyticsByTopic, getOverallAnalytics } = require("../models/analyticsM");
const redisClient=require('../config/redis');


const fetchAnalyticsByAlias=async(alias)=>{

    //checking Redis cache
    const cachedAnalytics=await redisClient.get(`analytics:alias:${alias}`);
    if(cachedAnalytics){
        console.log('cache hit for analytics by alias:',alias);
        return JSON.parse(cachedAnalytics);
    }

    //fetch from database if not in cache

    const analyticsData=await getAnalyticsByAlias(alias);
    console.log(analyticsData);
    if(!analyticsData){
        throw new Error("Anlytics not Found");
        
    }
    console.log('cache miss for analytics by alias:',alias);

    await redisClient.set(`analytics:alias:${alias}`,JSON.stringify(analyticsData),{EX:3600})   //cache result set for 1 hr
    return analyticsData;
};

const fetchAnalyticsBytopic=async(topic)=>{

    const cachedAnalytics=await redisClient.get(`analytics:topic:${topic}`);
    if(cachedAnalytics){
        console.log('cache hit for analytics by topic:',topic);
        return JSON.parse(cachedAnalytics)
    }



    const analyticsData=await getAnalyticsByTopic(topic);
    console.log(analyticsData);
    if(!analyticsData){
        throw new Error("Analytics not found for the topic");
        
    }
    console.log("cache miss for analytics by topic :",topic);

    await redisClient.set(`analytics:topic:${topic}`,JSON.stringify(analyticsData),{EX:3600});
    return analyticsData;

};

const fetchOverallAnalytics=async (userId) => {

    const cachedAnalytics=await redisClient.get(`analytics:overall:${userId}`);
    if(cachedAnalytics){
        console.log('Cache hit for overall analytics for user:',userId);
        return JSON.parse(cachedAnalytics);
    }

    const analyticsData=await getOverallAnalytics(userId);
    console.log(analyticsData);
    if(!analyticsData){
        throw new Error("overall analytics not found");
        
    }

    console.log('cache miss for overall analytics for user:',userId);
    await redisClient.set(`analytics:overall:${userId}`,JSON.stringify(analyticsData),{EX:3600});
    
    return analyticsData;
}


module.exports={fetchAnalyticsByAlias,fetchAnalyticsBytopic,fetchOverallAnalytics}