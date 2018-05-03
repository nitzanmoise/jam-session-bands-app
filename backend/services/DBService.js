// var DB_URL = "mongodb://Admin:Admin@ds261929.mlab.com:61929/chat_app";
<<<<<<< HEAD
var DB_URL = 'mongodb://nitzan:nitzan@ds111370.mlab.com:11370/jams';
=======
var DB_URL = 'mongodb://tomer:tomer@ds111370.mlab.com:11370/jams';
>>>>>>> 679f967fef43c4634f3aceabaab5a4b2ecd676a4

const mongo = require("mongodb");

var MongoClient = mongo.MongoClient;

function dbConnect() {
  var prmConnect = new Promise((resolve, reject) => {
    MongoClient.connect(DB_URL, function(err, db) {
      if (err) reject(err);
      else {
        resolve(db);
      }
    });
  });
  prmConnect.catch(err => console.error("Cannot Connect!", err));
  return prmConnect;
}

module.exports = {
  dbConnect
};
