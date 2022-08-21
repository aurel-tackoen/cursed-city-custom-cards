const { MongoClient } = require('mongodb');

const checkAuth = require('../plugins/functions/check-auth.js');
import { heroesValidation } from '../schemas/heroes-schema.js';

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();

export const handler = async function ({ body }, context) {
  try {
    console.log(context);
    console.log(process.env.CONTEXT);
    if (process.env.CONTEXT !== 'dev') {
      await checkAuth(context);
    }
    console.log('user', user);
    // const data = JSON.parse(body);
    // await heroesValidation(data);
    // const database = (await clientPromise).db('cursed-database');
    // const collection = database.collection('Heroes');
    // const item = await collection.insertOne(data);
    // return {
    //   statusCode: 200,
    //   body: JSON.stringify(item),
    // };
  } catch (error) {
    console.log(error);
    return { statusCode: 500, body: JSON.stringify(error) };
  }
};
