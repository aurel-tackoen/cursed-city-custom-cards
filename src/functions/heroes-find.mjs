const { MongoClient } = require('mongodb');

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();

export const handler = async function ({ body }) {
  try {
    const data = JSON.parse(body);
    const query = data.query;
    const params = data.params;
    const database = (await clientPromise).db('cursed-database');
    const collection = database.collection('Heroes');
    const items = await collection
      .find(query, { sort: params.sort, limit: params.limit })
      .toArray();
    const count = await collection.countDocuments(query);
    return {
      statusCode: 200,
      body: JSON.stringify({
        items,
        count,
      }),
    };
  } catch (error) {
    console.log(error);
    return { statusCode: 500, body: error.toString() };
  }
};
