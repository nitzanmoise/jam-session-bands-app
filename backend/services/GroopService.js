const mongo = require('mongodb');
var DBService = require('./DBService');


function query(userId) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection('Groop').find({ userId }).toArray((err, Groops) => {
          if (err) reject(err)
          else resolve(Groops)
          db.close();
        });
    });
  });
}

function add(Groop) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db.collection('Groop').insertOne(Groop, (err, res) => {
        console.log('resresresresresres', res);
        db.collection('Groop').findOne({_id: new mongo.ObjectID(res.insertedId)}, (err, GroopFromDB)=>{
          if (err) reject(err)
          else resolve(GroopFromDB)
          db.close();
        })
      });
    });
  });
}

module.exports = {
  query,
  add
}