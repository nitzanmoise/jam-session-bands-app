const mongo = require('mongodb');
var DBService = require('./DBService');


function query(groupId) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection('group').find({ groupId }).toArray((err, groups) => {
          if (err) reject(err)
          else resolve(groups)
          db.close();
        });
    });
  });
}

function add(group) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db.collection('group').insertOne(group, (err, res) => {
        console.log('res', res);
        db.collection('group').findOne({_id: new mongo.ObjectID(res.insertedId)}, (err, groupFromDB)=>{
          if (err) reject(err)
          else resolve(groupFromDB)
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