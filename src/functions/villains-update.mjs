const { MongoClient } = require('mongodb');
const ObjectID = require('mongodb').ObjectId;

const checkAuth = require('../plugins/functions/check-auth.js');
const checkOwner = require('../plugins/functions/check-owner.js');
import { validate } from '../schemas/villains-schema.js';

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();

export const handler = async function ({ body }, context) {
  try {
    const user = await checkAuth(context);
    const data = JSON.parse(body);
    await validate(data);
    await checkOwner(user, data);
    data._id = new ObjectID(data._id);
    const database = (await clientPromise).db('cursed-database');
    const collection = database.collection('Villains');
    const item = await collection.findOneAndUpdate(
      { _id: data._id },
      { $set: data },
      { returnDocument: 'after' }
    );
    return {
      statusCode: 200,
      body: JSON.stringify(item),
    };
  } catch (error) {
    console.log(error);
    return { statusCode: 500, body: JSON.stringify(error) };
  }
};
