const { MongoClient } = require('mongodb');

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();

exports.handler = async function (event, context) {
  try {
    const database = (await clientPromise).db('cursed-database');
    const collection = database.collection('Users');
    const results = await collection.find({}).limit(10).toArray();
    return {
      statusCode: 200,
      body: JSON.stringify(results),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
