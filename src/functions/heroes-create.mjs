const { MongoClient } = require('mongodb');
const ObjectID = require('mongodb').ObjectId;

import { heroesValidation } from '../schemas/heroes-schema.js';

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();

export const handler = async function ({ body }) {
  try {
    const data = JSON.parse(body);
    console.log(data);
    await heroesValidation(data);
    const database = (await clientPromise).db('cursed-database');
    const collection = database.collection('Heroes');
    const item = await collection.insertOne(data);
    console.log(data);
    console.log(item);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.log(error);
    return { statusCode: 500, body: JSON.stringify(error) };
  }
};
