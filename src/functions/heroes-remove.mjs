const { MongoClient } = require('mongodb');
const ObjectID = require('mongodb').ObjectId;

const checkAuth = require('../plugins/functions/check-auth.js');
const checkOwner = require('../plugins/functions/check-owner.js');

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();

export const handler = async function ({ body }, context) {
  try {
    const user = await checkAuth(context);
    const data = JSON.parse(body);
    console.log(data);
    await checkOwner(user, data.hero);
    data._id = new ObjectID(data._id);
    const database = (await clientPromise).db('cursed-database');
    const collection = database.collection('Heroes');
    // await collection.deleteOne({ _id: data._id });
    return {
      statusCode: 200,
      body: JSON.stringify(true),
    };
  } catch (error) {
    console.log(error);
    return { statusCode: 500, body: JSON.stringify(error) };
  }
};
