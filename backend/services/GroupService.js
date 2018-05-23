const mongo = require("mongodb");
var DBService = require("./DBService");
// find({ skills: { $in:  ['guitar', 'chelo']} })

// DBService.dbConnect().then(db => {
//   db.collection("users").updateMany(
//     {},
//     {
//       $set: {
//         posts: []
//       }
//     },
//     function() {
//       console.log("asdasdasd");
//     }
//   );
// });

function query() {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection("groups")
        .find()
        .toArray((err, groups) => {
          if (err) reject(err);
          else resolve(groups);
          db.close();
        });
    });
  });
}

function addAskerToGroupMembers({ askerId, groupId }) {
  // console.log({ askerId, groupId });
  var groupMongoId = new mongo.ObjectID(groupId);
  var userMongoId = new mongo.ObjectID(askerId);

  var newMember = { id: askerId, isAdmin: true, position: "Guitar" };
  return DBService.dbConnect().then(db => {
    return db
      .collection("groups")
      .updateOne({ _id: groupMongoId }, { $push: { members: newMember } })
      .then(res => {
        return db
          .collection("users")
          .updateOne(
            { _id: userMongoId },
            { $push: { groups: { id: groupId } } }
          );
      });
  });
}

function addPost(groupId, newPost) {
  var mongoId = new mongo.ObjectID(groupId);
  return DBService.dbConnect().then(db => {
    return db
      .collection("groups")
      .updateOne({ _id: mongoId }, { $push: { posts: newPost } });
  });
}

function add(group) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db.collection("groups").insertOne(group, (err, res) => {
        db
          .collection("groups")
          .findOne(
            { _id: new mongo.ObjectID(res.insertedId) },
            (err, groupFromDB) => {
              if (err) reject(err);
              else resolve(groupFromDB);
              db.close();
            }
          );
      });
    });
  });
}

function getById(groupId) {
  groupId = new mongo.ObjectID(groupId);
  return new Promise((resolve, reject) => {
    return DBService.dbConnect().then(db => {
      db.collection("groups").findOne({ _id: groupId }, (err, res) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(res);
      });
    });
  });
}

function remove(groupId) {
  return new Promise((resolve, reject) => {
    groupId = new mongo.ObjectID(groupId);
    return DBService.dbConnect().then(db => {
      db.collection("groups").remove({ _id: groupId }, (err, res) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        console.log("remove: ", res);
        resolve(res);
      });
    });
  });
}

function updateGroup(updateFields, _id) {
  // delete updateFields._id
  updateFields._id = new mongo.ObjectID(updateFields._id);
  const updateObj = {
    $set: updateFields
  };
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(dataBase => {
      console.log();
      dataBase
        .collection("groups")
        .updateOne(
          { _id: updateFields._id },
          updateObj,
          (err, updatedGroup) => {
            console.log("INSIDE UPDATE GROUPPPP");
            if (err) return console.log("Update Group Error!");
            else resolve(updatedGroup);
            dataBase.close();
          }
        );
    });
  });
}

function sendJoinReqs({ joinReq, admins }) {
  var askerId = new mongo.ObjectID(joinReq.askerId);
  var adminsIds = admins.map(({ id }) => new mongo.ObjectID(id));
  // return new Promise((resolve, reject) => {
  return DBService.dbConnect().then(db => {
    db
      .collection("users")
      .updateMany({ _id: { $in: adminsIds } }, { $push: { joinReqs: joinReq } })
      .then(res => {
        return db
          .collection("users")
          .updateOne(
            { _id: askerId },
            { $push: { sentReqsToJoinBands: joinReq } }
          );
      });
    // (err, result) => {
    //   if (err) reject(err);
    //   else resolve(result.result);
    // }
  });
  // });
}

function removeMember(groupId, memberId) {
  // console.log({ userId, timeStamp });
  var mongoId = new mongo.ObjectID(groupId);
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db.collection("groups").updateOne(
        { _id: mongoId },
        {
          $pull: {
            members: { id: memberId }
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

function getBandMembersData(memberIds) {
  var mongoIds = memberIds.map(id => new mongo.ObjectID(id));
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection("users")
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
  add,
  getById,
  remove,
  updateGroup,
  getBandMembersData,
  sendJoinReqs,
  addAskerToGroupMembers,
  addPost,
  removeMember
};
