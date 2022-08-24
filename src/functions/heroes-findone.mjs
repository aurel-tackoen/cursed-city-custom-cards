const { MongoClient } = require('mongodb');
const ObjectID = require('mongodb').ObjectId;

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();

export const handler = async function ({ body }) {
  try {
    console.log(body);
    const data = JSON.parse(body);
    data._id = new ObjectID(data._id);
    const database = (await clientPromise).db('cursed-database');
    const collection = database.collection('Heroes');
    const item = await collection.findOne({ _id: data._id });
    return {
      statusCode: 200,
      body: JSON.stringify(item),
    };
  } catch (error) {
    console.log(error);
    return { statusCode: 500, body: error.toString() };
  }
};
