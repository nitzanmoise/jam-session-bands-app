const mongo = require('mongodb');
var DBService = require('./DBService');


module.exports.checkLogin = user => {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection('users')
        .findOne({ email: user.email, password: user.password }, function(
          err,
          userFromDB
        ) {
          if (err) reject(err)
          else resolve(userFromDB)
          db.close();
        });
    });
  });
};

module.exports.query = users => { 
    return new Promise((resolve, reject) => {
        return DBService.dbConnect()
            .then(db => {
                db.collection('users').find().toArray((err, users) => {
                    if (err) return reject(err);
                    resolve(users);
                })
            })
    });
}

module.exports.getById = userId => {
  userId = new mongo.ObjectID(userId);
  return new Promise((resolve, reject) => {
    return DBService.dbConnect()
        .then(db => {
            db.collection('users').findOne({_id: userId}, (err, res) => {
                if (err){
                    console.log(err)
                    return reject(err);
                } 
                console.log('selected user', res);
                resolve(res);
            })
        })

});
}


function validateDetails(user) {
  console.log(user);
  return user.email !== 'Shluki@Shluki.com';
}

module.exports.addUser = user => {
  return new Promise((resolve, reject) => {
    let isValidate = validateDetails(user);
    if (!isValidate) reject('Validate failed!');
    DBService.dbConnect().then(db => {
      db
        .collection('users')
        .findOne({ name: user.name }, function(err, userFromDB) {
          // If name is already used!
          if (userFromDB) {
            console.log('Name is already used!');
            reject('Name is already used!');
            db.close();
          } else {
            db.collection('users').insert(user, (err, res) => {
              if (err) reject(err);
              else resolve(res.ops);
              db.close();
            });
          }
          
        });
    });
  });
};



module.exports.updateUser = (upadteFileds, _id) => {
  console.log('inside edit user')
  const updateObj = {
    $set: upadteFileds
  }
  _id = new mongo.ObjectID(_id);
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(dataBase => {
      dataBase.collection("users").updateOne({ _id }, updateObj, (err, updatedUser) => {
          if (err) return console.log('Update User Error!')
          else resolve(updatedUser);
          dataBase.close();
        });
    });
  });
}