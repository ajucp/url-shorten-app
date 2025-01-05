const { shortenUrl,getOriginalUrl}=require('../services/urlS')

exports.createShortUrl=async(req,res)=>{
    const{longUrl,customAlias,topic}=req.body;
    console.log('long Url:',longUrl)
    console.log('customAlias:',customAlias)
    console.log('topic:',topic)

    if(!longUrl){
        // console.log('hai')
        return res.status(400).json({message:'longUrl is required' });
        
    }

    try {
        const {alias}=await shortenUrl(longUrl,customAlias,topic);
        const shortUrl=`${req.protocol}://${req.get('host')}/api/shorten/${alias}`;

        res.status(201).json({
            shortUrl,
            createdAt:new Date(),
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({message:'Internal Server Error'});
    }
}

exports.redirectShortUrl=async(req,res)=>{
    const{alias}=req.params;
    console.log('alias is:',alias)
    // console.log('Request URL:', req.originalUrl);
    console.log('Headers:', req.headers);
    try {
        const shortUrlData=await getOriginalUrl(alias)
        
        if(!shortUrlData){
            return res.status(404).json({message:"Short Url not found"});
        }

        //log analytics data
        console.log({
            timestamp: new Date(),
            userAgent: req.headers['user-agent'],
            ipAddress: req.ip
        });

        res.redirect(shortUrlData.longUrl);

    } catch (err) {
        console.error(err);
        res.status(400).json({message:"Internal Server Error"})
    }
}