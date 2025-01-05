const {fetchAnalyticsByAlias,fetchAnalyticsBytopic,fetchOverallAnalytics}=require('../services/analyticsS')

exports.getAnalyticsByAlias=async(req,res)=>{
    console.log('get analytics by alias')
    const {alias}=req.params;
    console.log({alias})

    try {
       const analyticsData=await fetchAnalyticsByAlias(alias);
       console.log(analyticsData);
       res.status(200).json(analyticsData); 

    } catch (err) {
        res.status(404).json({message:err.message});
    }

}

exports.getAnalyticsByTopic=async(req,res)=>{
    console.log('get analytics by topic')
    const {topic}=req.params;

    try {
        const analyticsData=await fetchAnalyticsBytopic(topic);
        console.log(analyticsData);
        res.status(200).json(analyticsData);

    } catch (err) {
        res.status(404).json({message:err.message});
    }

}

exports.getOverallAnalytics=async(req,res)=>{
    console.log('get Overall analytics by user');
    const userId=req.userId;

    try {
        const analyticsData=await fetchOverallAnalytics(userId);
        console.log(analyticsData);
        res.status(200).json(analyticsData);

    } catch (err) {
        res.status(404).json({message:err.message});
    }

}