const mongodb=require('mongodb');

const mongoClient=mongodb.MongoClient;
let _db;

const mongoConnect=async(callback)=>mongoClient.connect(
    'mongodb+srv://ajmalcp:AuJT5T4gmA4kLiNT@cluster0.98nsj.mongodb.net/node-shop?retryWrites=true&w=majority'
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

