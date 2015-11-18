/** mongodb module. Manage mongodb connection and handle requests
 * @module mongodb
 */

var mongodb = require('mongodb').MongoClient;
var winston = require('winston');
var _db;

/**
 * Connect the MongoDB using the env connection string (MONGO_URL)
 * @return {Promise} A promise resolving when MongoDB is properly connected, with a connected DB instance
 */
function connect() {
  return new Promise(function(resolve, reject) {
    if (_db) return resolve(_db);
    winston.info('[MongoDB] Connecting to DB...');
    mongodb.connect(process.env.MONGO_URL, function (err, db) {
      _db = db;
      winston.info('[MongoDB] Connected');
      if (err) {
        reject(err);
      }

      resolve(db);
    });
  });
}

/**
 * Closes the connection to MongoDB
 * @return {Promise} a mongodb promise resolving when DB is properly closed
 */
function close() {
  winston.info('[MongoDB] Connection closed');
  if (_db) {
    return _db.close();
  }
}

/**
 * Return the current connected DB instance
 * @return {object} DB - The MongoDB connected DB instance
 */
function get() {
  return _db;
}

module.exports = {
  connect: connect,
  close: close,
  get: get,
  driver: mongodb,
  collection: function(name) {
    return _db.collection(name);
  }
};