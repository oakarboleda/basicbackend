const MongoClient = require('mongodb').MongoClient;

const url =
  'mongodb+srv://oak:y0LIIXlMWnNP0XOG@cluster0.czs2w.mongodb.net/sample_geospatial?retryWrites=true&w=majority';

const createShipwreck = async (req, res, next) => {
  const newShipwreck = {
    name: req.body.name,
    latdec: req.body.latdec,
    londec: req.body.londec
  };
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db();
    const result = db.collection('Shipwrecks').insertOne(newShipwreck);
  } catch (error) {
    return res.json({message: 'Could not store data.'});
  };
  client.close();

  res.json(newShipwreck);
};

const getShipwreck = async (req, res, next) => {
  const client = new MongoClient(url);

  let Shipwrecks;

  try {
    await client.connect();
    const db = client.db();
    Shipwrecks = await db.collection('Shipwrecks').find().toArray();
  } catch (error) {
    return res.json({message: 'Could not retrieve products.'});
  };
  client.close();

  res.json(Shipwrecks);
};

exports.createShipwreck = createShipwreck;
exports.getShipwreck = getShipwreck;