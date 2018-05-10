var GroupService = require("../services/GroupService");
const GROUP_URL = "/data/group";

module.exports = app => {
  app.put(`${GROUP_URL}/addMember`, function(req, res) {
    GroupService.addAskerToGroupMembers(req.body)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.status(500).send();
      });
  });

  app.put(`${GROUP_URL}/:id/addPost`, function(req, res) {
    var groupId = req.params.id;
    console.log("req body", req.body);

    // var newPost = req.body.newPost;
    GroupService.addPost(groupId, req.body.newPost)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.status(500).send();
      });
  });

  app.get(GROUP_URL, (req, res) => {
    GroupService.query().then(groups => {
      // console.log('Groups: ', groups);
      res.json(groups);
    });
  }),
    app.post(`${GROUP_URL}/members`, (req, res) => {
      const members = req.body.members;

      var membersIds = members.map(member => member.id);

      GroupService.getBandMembersData(membersIds).then(members => {
        res.json(members);
      });
    });

  //` app.get(`${GROUP_URL}/user` , isLoggedIn, (req, res) => {
  //`   GroupService.query(req.session.user._id).then(groups => {
  //     console.log('Groups: ', groups);
  //     res.json(groups)
  //   })
  // }),

  app.get(`${GROUP_URL}/:id`, (req, res) => {
    const groupId = req.params.id;
    GroupService.getById(groupId).then(group => {
      res.json(group);
    });
  });

  app.post(GROUP_URL, (req, res) => {
    const group = req.body;
    // group.userId = req.session.user._id;
    GroupService.add(group).then(addedGroup => {
      res.json(addedGroup);
    });
  });

  app.delete(`${GROUP_URL}/:id`, (req, res) => {
    const groupId = req.params.id;
    GroupService.remove(groupId)
      .then(() => res.send("deleted"))
      .catch(() => res.status(500).send("problem"));
  });
  app.put(`${GROUP_URL}/:id/joinReq`, function(req, res) {
    console.log("before the datbase manolte");
    GroupService.sendJoinReqs(req.body)
      .then(result => {
        console.log("afte tje database maniplatine");
        res.json(result);
      })
      .catch(err => {
        console.log("on the cathc");
        res.status(500).send();
      });
  });

  app.put(`${GROUP_URL}/:id`, function(req, res) {
    const _id = req.params.id;
    const upadteFileds = req.body;
    GroupService.updateGroup(upadteFileds, _id)
      .then(group => res.json(group))
      .catch(err => res.status(500).send("Could not update group"));
  });
};
