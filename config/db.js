const mongodb=require('mongodb');

const mongoClient=mongodb.MongoClient;
let _db;

const mongoConnect=async(callback)=>mongoClient.connect(
    'mongodb+srv://ajucp:J6GQDsaCXT2uo2Ga@cluster0.98nsj.mongodb.net/url-shorten-app?retryWrites=true&w=majority'
     )
    .then(client=>{
        console.log("DATA_BASE IS CONNECTED");
        _db=client.db('url-shorten-app')
        callback()
    })
    .catch(err=>{
        console.log(err);
        throw err
        }     
    )
        
const getDb=()=>{
    if(_db){
        return _db;
    }
    throw "NO DATABASE IS FOUND"
}

module.exports={mongoConnect,getDb};

