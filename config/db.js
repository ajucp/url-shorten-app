const mongodb=require('mongodb');

const mongoClient=mongodb.MongoClient;
let _db;

const mongoConnect=async(callback)=>mongoClient.connect(
    'mongodb://localhost:27017/url-shorten-app'
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

