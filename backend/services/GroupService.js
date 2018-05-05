const mongo = require('mongodb');
var DBService = require('./DBService');
// find({ skills: { $in:  ['guitar', 'chelo']} })


function query() {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection('groups').find().toArray((err, groups) => {
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
      db.collection('groups').insertOne(group, (err, res) => {
        console.log('res', res);
        db.collection('groups').findOne({_id: new mongo.ObjectID(res.insertedId)}, (err, groupFromDB)=>{
          if (err) reject(err)
          else resolve(groupFromDB)
          db.close();
        })
      });
    });
  });
}


function getById(groupId) {
  groupId = new mongo.ObjectID(groupId);
  return new Promise((resolve, reject) => {
    return DBService.dbConnect()
        .then(db => {
            db.collection('groups').findOne({_id: groupId}, (err, res) => {
                if (err){
                    console.log(err)
                    return reject(err);
                } 
                console.log('selected group', res);
                resolve(res);
            })
        })

});
}


function remove(groupId){
  return new Promise((resolve, reject) => {
      
  groupId = new mongo.ObjectID(groupId);
      return DBService.dbConnect()
          .then(db => {
              db.collection('groups').remove({_id: groupId}, (err, res) => {
                  if (err){
                      console.log(err)
                      return reject(err);
                  } 
                  console.log('remove: ', res);
                  resolve(res);
              })
          })

  });
}


function updateGroup(upadteFileds, _id) {
  console.log('inside edit user')
  const updateObj = {
    $set: upadteFileds
  }
  _id = new mongo.ObjectID(_id);
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(dataBase => {
      dataBase.collection("groups").updateOne({ _id }, updateObj, (err, updatedGroup) => {
          if (err) return console.log('Update User Error!')
          else resolve(updatedGroup);
          dataBase.close();
        });
    });
  });
}

function getBandMembersData(memberIds){
  var mongoIds = memberIds.map(id => new mongo.ObjectID(id) )
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection('users').find({_id : {$in : mongoIds}}).toArray((err, groups) => {
          if (err) reject(err)
          else resolve(groups)
          db.close();
        });
    });
  });
}

module.exports = {
  query,
  add,
  getById,
  remove,
  updateGroup,
  getBandMembersData
}