var GroopService = require('../services/GroopService')

module.exports = app => {
  app.get('/Groop', isLoggedIn, (req, res) => {
    console.log('Groop: ', req.session);
    GroopService.query(req.session.user._id).then(Groops => {
      console.log('GroopS: ', Groops);
      res.json(Groops)
    })

  });
  app.post('/Groop', isLoggedIn, (req, res) => {
    const Groop = req.body;
    Groop.userId = req.session.user._id; 
    GroopService.add(Groop).then(addedGroop => {
      res.json(addedGroop)
    })

  });

}