const { MongoClient } = require('mongodb');

const checkAuth = require('../plugins/functions/check-auth.js');
import { validate } from '../schemas/villains-schema.js';

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();

export const handler = async function ({ body }, context) {
  try {
    await checkAuth(context);
    const data = JSON.parse(body);
    await validate(data);
    const database = (await clientPromise).db('cursed-database');
    const collection = database.collection('Villains');
    const item = await collection.insertOne(data);
    return {
      statusCode: 200,
      body: JSON.stringify(item),
    };
  } catch (error) {
    console.log(error);
    return { statusCode: 500, body: JSON.stringify(error) };
  }
};
