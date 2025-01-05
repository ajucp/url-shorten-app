const {ObjectId}=require('mongodb');
const getDb = require('../config/db').getDb;

const collectionName='short_urls';

const createShortUrl =async(shortUrlData)=>{
    const db=getDb();
    const result =await db.collection(collectionName).insertOne(shortUrlData);
    return result.insertedId;
};

const findByAlias=async(alias)=>{
    const db=getDb();
    return await db.collection(collectionName).findOne({alias});

};

module.exports={
    createShortUrl,
    findByAlias
}