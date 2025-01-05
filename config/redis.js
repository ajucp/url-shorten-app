const redis=require('redis');

const redisClient=redis.createClient({
    socket: {
        host: 'redis', // or '127.0.0.1'
        port: 6379,
    },
});

redisClient.on('connect',()=>{
    console.log('Connected to Redis');
});

redisClient.on('error',(err)=>{
    console.error("Redis Connection Error:",err)
});

redisClient.connect().catch((err) => {
    console.error('Failed to connect to Redis:', err);
});

module.exports=redisClient;