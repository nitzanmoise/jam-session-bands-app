var UserService = require("../services/UserService");
const USER_URL = "/data/user";

module.exports = app => {
  app.get(USER_URL, (req, res) => {
    // console.log(req.query);
    UserService.query(req.query)
      .then(users => {
        res.json(users);
      })
      .catch(() => res.status(500).send("problem getting users"));
  });

  app.put(`${UER_URL}/:id/groupjoinReq`, function(req, res) {
    UserService.sendGroupJoinReq(req.body)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.status(500).send();
      });
  });

  app.get(`${USER_URL}/:id`, (req, res) => {
    const userId = req.params.id;
    console.log({ userId });
    UserService.getById(userId)
      .then(selectedUser => res.json(selectedUser))
      .catch(() => res.status(500).send("problem"));
  });

  app.put(`${USER_URL}/deleteReq`, (req, res) => {
    UserService.deleteRequest(req.body)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.status(500).send();
      });
  });

  app.post("/login", (req, res) => {
    const user = req.body;
    UserService.checkLogin(user).then(userFromDB => {
      if (userFromDB) {
        delete userFromDB.password;
        req.session.user = userFromDB;

        res.json({ token: "Beareloginr: puk115th@b@5t", user: userFromDB });
      } else {
        req.session.user = null;
        res.status(403).send({ error: "Login failed!" });
      }
    });
  });

  app.put(`${USER_URL}/:id`, function(req, res) {
    const _id = req.params.id;
    const upadteFileds = req.body;
    UserService.updateUser(upadteFileds, _id)
      .then(user => res.json(user))
      .catch(err => res.status(500).send("Could not update user"));
  });

  app.post(USER_URL, function(req, res) {
    var user = req.body;
    UserService.addUser(user)
      .then(addedUser => res.json(addedUser))
      .catch(err =>
        res.status(403).send({ error: `Register failed, ERROR:${err}` })
      );
  });

  app.post("/logout", function(req, res) {
    req.session.reset();
    res.end("Loggedout");
  });

  app.get(`${USER_URL}/:id`, isLoggedIn, (req, res) => {
    res.end(`Profile of ${req.session.user.name}`);
  });

  app.post(`${USER_URL}/groups`, (req, res) => {
    const groups = req.body.groups;

    var groupsIds = groups.map(group => group.id);

    UserService.getBandGroupsData(groupsIds).then(groups => {
      res.json(groups);
    });
  });
};
