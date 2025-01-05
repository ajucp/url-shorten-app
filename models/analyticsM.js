const {getDb}=require('../config/db');


//fetch url analytics

exports.getAnalyticsByAlias=async(alias)=>{
    const db=getDb();
    const clicksData=await db.collection('clicks').find({alias}).toArray();
    console.log("clicks Data:",clicksData);

    const totalClicks=clicksData.length;
    const uniqueUsers=new Set(clicksData.map(click=>click.userId)).size;

    const clicksByDate=clicksData.reduce((acc,click)=>{
        const date=click.timestamp.toISOString().split('T')[0];
        console.log("date: ",date)
        acc[date]=(acc[date] || 0)+1;
        return acc;
    },{});

    const osType=aggregateByField(clicksData,'os');
    const deviceType=aggregateByField(clicksData,'device');

    return {
        totalClicks,
        uniqueUsers,
        clicksByDate:Object.entries(clicksByDate).map(([date,count])=>({date,count})),
        osType,
        deviceType,
    };
};

exports.getAnalyticsByTopic=async(topic)=>{
    const db=getDb();
    const urls=await db.collection('urls').find({topic}).toArray();
    console,log('Url:' ,urls);
    let totalClicks=0;
    let uniqueUsers=new Set();

    const clicksByDate={};
    const urlDate=[];

    for(const url of urls){

        const clicks=await db.collection('clicks').find({alias:url.alias}).toArray();
        console.log("clicks :",clicks);
        totalClicks +=clicks.length;
        uniqueUsers=new Set([...uniqueUsers,...clicks.map(click=>click.userId)]);

        clicks.forEach(clicks => {
            const date=click.timestamp.toISOString().split('T')[0];
            clicksByDate[date]=(clicksByDate[date] || 0)+1;

        });

        urlDate.push({
            shortUrl:url.shortUrl,
            totalClicks:clicks.length,
            uniqueUsers:new Set(clicks.map(click=>click.userId)).size,
        });

    }

    return{
        totalClicks,
        uniqueUsers:uniqueUsers.size,
        clicksByDate:Object.entries(clicksByDate).map(([date,count])=>({date,count})),
        urls:urlDate
    };
};

exports.fetchOverallAnalytics=async(userId)=>{
    const db=getDb();

    const urls=await db.collection('urls').find({userId}).toArray();
    console,log('Url:' ,urls);
    let totalClicks=0;
    let uniqueUsers=new Set();

    const clicksByDate={};
    const osType={};
    const deviceType={};

    for (const url of urls){

        const clicks=await db.collection('clicks').find({alias:url.alias}).toArray();
        console.log("clicks :",clicks);
        totalClicks+=clicks.length;
        uniqueUsers=new Set([...uniqueUsers,...clicks.map(click=>click.userId)]);

        clicks.forEach(click=>{

            const date=click.timestamp.toISOString().split('T')[0];
            clicksByDate[date]=(clicksByDate[date] || 0)+1;

            osType[click.os]=(osType[click.os] || 0)+1;
            deviceType[click.device]=(deviceType[click.device] || 0)+1;

        });
    }
    return{
        totalUrls:urls.length,
        totalClicks,
        uniqueUsers:uniqueUsers.size,
        clicksByDate:Object.entries(clicksByDate).map(([date,count])=>({date,count})),
        osType:aggregateFieldObject(osType),
        deviceType:aggregateFieldObject(deviceType),

    }
}

//additional functions

function aggregateByField(data,field) {
    const aggregate=data.reduce((acc,item)=>{
        const key=item[field];
        acc[key]=acc[key] || {uniqueClicks:0,uniqueUsers:new Set() };
        acc[key].uniqueClicks++;
        acc[key].uniqueUsers.add(item.userId);
        return acc;
    },{});

    return Object.entries(aggregate).map(([key,value])=>({
        osName:key,
        uniqueclicks:value.uniqueClicks,
        uniqueUsers:value.uniqueUsers.size,
    }));
}

function aggregateFieldObject(obj) {
    
    return Object.entries(obj).map(([key,value])=>({
        name:key,
        count:value
    }));
}