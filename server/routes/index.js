const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Client = require('../models/Client');




router.post('/addClient', (req, res, next) => {
  const currentuser = req.user._id
  const client = req.body.clientName
  Client.create({
    owner: currentuser,
    clientName: client
  })
    .then((client) => {
      User.findByIdAndUpdate(currentuser, { $push: { clients: client._id } }, { new: true })
        .then((x) => {
          Client.find({})
            .then((allClients) => { res.json(allClients) })
        })
    })
    .catch(err => console.log("Hubo un error!", err))
})

router.get('/allClients', (req, res, next) => {
  Client
    .find({ owner: req.user._id })
    .then((allClients) => { res.json(allClients) })
    .catch(err => console.log("Hubo un error!", err))
});


router.get('/client/:id', (req, res, next) => {
  console.log(req.params)
  Client
    .find({ _id: req.params.id })
    .then((allClients) => { res.json(allClients) })
    .catch(err => console.log("Hubo un error!", err))
});

//.then((allClients) => { res.json(allClients) })

module.exports = router;
