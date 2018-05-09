const mongo = require("mongodb");
var DBService = require("./DBService");

function checkLogin(user) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection("users")
        .findOne({ email: user.email, password: user.password }, function(
          err,
          userFromDB
        ) {
          if (err) reject(err);
          else resolve(userFromDB);
          db.close();
        });
    });
  });
}

function query(users) {
  return new Promise((resolve, reject) => {
    return DBService.dbConnect().then(db => {
      db
        .collection("users")
        .find()
        .toArray((err, users) => {
          if (err) return reject(err);
          resolve(users);
        });
    });
  });
}

function getById(userId) {
  // console.log({ userId });
  userId = new mongo.ObjectID(userId);
  return new Promise((resolve, reject) => {
    return DBService.dbConnect().then(db => {
      db.collection("users").findOne({ _id: userId }, (err, res) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        // console.log("selected user", res);
        resolve(res);
      });
    });
  });
}

function sendGroupJoinReq(joinReq) {
  var userId = joinReq.userId;
  console.log("gtoup reqqqqqq", joinReq);

  var mongoId = new mongo.ObjectID(userId);
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db.collection("users").update(
        {
          _id: mongoId
        },
        {
          $push: {
            groupJoinReq: joinReq
          }
        },
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(result.result);
            resolve(result.result);
          }
        }
      );
    });
  });
}

function deleteRequest({ userId, timeStamp }) {
  // console.log({ userId, timeStamp });
  var mongoId = new mongo.ObjectID(userId);
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db.collection("users").updateOne(
        { _id: mongoId },
        {
          $pull: {
            joinReqs: { createdAt: timeStamp },
            groupJoinReq: { createdAt: timeStamp }
          }
        },
        (err, result) => {
          if (err) reject(err);
          else resolve(result.result);
        }
      );
    });
  });
}

function validateDetails(user) {
  // console.log(user);
  return user.email !== "Shluki@Shluki.com";
}

function addUser(user) {
  return new Promise((resolve, reject) => {
    let isValidate = validateDetails(user);
    if (!isValidate) reject("Validate failed!");
    DBService.dbConnect().then(db => {
      db
        .collection("users")
        .findOne({ name: user.name }, function(err, userFromDB) {
          // If name is already used!
          if (userFromDB) {
            // console.log("Name is already used!");
            reject("Name is already used!");
            db.close();
          } else {
            db.collection("users").insert(user, (err, res) => {
              if (err) reject(err);
              else resolve(res.ops);
              db.close();
            });
          }
        });
    });
  });
}

function updateUser(upadteFileds, _id) {
  // console.log("inside edit user");
  const updateObj = {
    $set: upadteFileds
  };
  _id = new mongo.ObjectID(_id);
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(dataBase => {
      dataBase
        .collection("users")
        .updateOne({ _id }, updateObj, (err, updatedUser) => {
          if (err) return console.log("Update User Error!");
          else resolve(updatedUser);
          dataBase.close();
        });
    });
  });
}

function getBandGroupsData(groupIds) {
  var mongoIds = groupIds.map(id => new mongo.ObjectID(id));
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection("groups")
        .find({ _id: { $in: mongoIds } })
        .toArray((err, groups) => {
          if (err) reject(err);
          else resolve(groups);
          db.close();
        });
    });
  });
}

module.exports = {
  query,
  addUser,
  getById,
  updateUser,
  getBandGroupsData,
  checkLogin,
  deleteRequest,
  sendGroupJoinReq
};
