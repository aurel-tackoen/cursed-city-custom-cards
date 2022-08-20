const { MongoClient } = require('mongodb');
const ObjectID = require('mongodb').ObjectId;

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();

exports.handler = async function ({ body }) {
  try {
    console.log(body);
    const data = JSON.parse(body);
    console.log(data);
    const database = (await clientPromise).db('cursed-database');
    const collection = database.collection('Heroes');
    const item = await collection.insertOne(data);
    console.log(item);
    return {
      statusCode: 200,
      body: JSON.stringify(item),
    };
  } catch (error) {
    console.log(error);
    return { statusCode: 500, body: error.toString() };
  }
};
