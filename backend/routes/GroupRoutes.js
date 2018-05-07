var GroupService = require('../services/GroupService')
const GROUP_URL = '/data/group';


module.exports = app => {
  app.get(GROUP_URL ,(req, res) => {
    GroupService.query().then(groups => {
      // console.log('Groups: ', groups);
      res.json(groups)
    })
  }),

  app.post(`${GROUP_URL}/members`,(req, res) => {
  const members = req.body.members;    
  console.log('members',members);
    
  var membersIds = members.map(member => member.id)
  console.log('thi is membrs id', membersIds );
  
    GroupService.getBandMembersData(membersIds).then(members => {
      console.log('group members', members);
      res.json(members)
    })
  })

  //` app.get(`${GROUP_URL}/user` , isLoggedIn, (req, res) => {
  //`   GroupService.query(req.session.user._id).then(groups => {
  //     console.log('Groups: ', groups);
  //     res.json(groups)
  //   })
  // }),

  app.get(`${GROUP_URL}/:id` , (req, res) => {
  const groupId = req.params.id;      
      GroupService.getById(groupId).then(group => {
        console.log('group: ', group);
        res.json(group)
      })

  }),

  app.post( GROUP_URL ,  (req, res) => {
    const group = req.body;
    // group.userId = req.session.user._id; 
      GroupService.add(group).then(addedGroup => {
      res.json(addedGroup)
    })

  }),

  app.delete(`${GROUP_URL}/:id`, (req, res) => {
    const groupId = req.params.id;
    GroupService.remove(groupId)
      .then(() => res.send("deleted"))
      .catch(() => res.status(500).send("problem"));
  }),


  app.put(`${GROUP_URL}/:id/joinReq`, function (req, res){
    GroupService.sendJoinReqs(req.body)
            .then(result =>{
                res.json(result)
            })
            .catch(err => {
              res.status(500).send()
            })
    // const _id = req.params.id;
    // joinReq = req.body
    //joinRequest
    //admins
    // console.log(joinReq)
    // GroupService.updat eReqs(joinReq ,_id )
    // .then(group=> res.json(group))
    // .catch(err=> res.status(500).send(('Could not update group')))
  })

  app.put(`${GROUP_URL}/:id`, function (req, res){
    const _id = req.params.id;
    const upadteFileds = req.body;
    GroupService.updateGroup(upadteFileds, _id )
    .then(group=> res.json(group))
    .catch(err=> res.status(500).send(('Could not update group')))
  })


}
