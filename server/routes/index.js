const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Client = require('../models/Client');
const uploadCloud = require('../config/Cloudinary.js');
const Looks = require('../models/Looks')
const ClientInfo = require('../models/ClientInfo')


router.post('/addClient', (req, res, next) => {
  const currentuser = req.user._id
  const client = req.body.clientName
  Client.create({
    owner: currentuser,
    clientName: client
  })
    .then((client) => {
      const clientID = client._id
      ClientInfo.create({
        client: clientID,
        infoTitle: "Hobbies",
      }).then((info) => {
        Client.findByIdAndUpdate(clientID, { $push: { infos: info._id } }, { new: true })
          .then(() => res.status(200))
      })
      ClientInfo.create({
        client: clientID,
        infoTitle: "Datos personales",
      }).then((info) => {
        Client.findByIdAndUpdate(clientID, { $push: { infos: info._id } }, { new: true })
          .then(() => res.status(200))
      })
      ClientInfo.create({
        client: clientID,
        infoTitle: "Restaurantes visitados",
      }).then((info) => {
        Client.findByIdAndUpdate(clientID, { $push: { infos: info._id } }, { new: true })
          .then(() => res.status(200))
      })
      User.findOneAndUpdate({ _id: req.user._id }, { $push: { clients: clientID } }, { new: true })
        .populate("clients")
        .then((user) => { res.json(user) })
        .catch(err => console.log("Hubo un error!", err))
    }).catch(err => console.log("Hubo un error!", err))
})


router.get('/allClients', (req, res, next) => {
  Client
    .find({ owner: req.user._id })
    .then((allClients) => { res.json(allClients) })
    .catch(err => console.log("Hubo un error!", err))
});

router.get('/user', (req, res, next) => {
  User
    .findById(req.user._id)
    .then((userData) => { res.json(userData) })
    .catch(err => console.log("Hubo un error!", err))
});

router.post('/users/Userpic', uploadCloud.single('photo'), (req, res, next) => {
  const imgName = req.user.username
  const imgPath = req.file.url
  User.findOneAndUpdate({ _id: req.user._id }, { picture: { imgName: imgName, imgPath: imgPath } }, { new: true })
    .then(photo => {
      res.json(photo);
    })
    .catch(error => {
      console.log(error);
    })
});

router.post('/deleteInfo', (req, res, next) => {
  const info = req.body.info
  const infoID = req.body.infoID
  console.log(infoID)
  ClientInfo.findByIdAndUpdate(infoID, { $pull: { infoData: info } }, { new: true })
    .then((info) => { res.json(info) })
    .catch(err => console.log("Hubo un error!", err))
});

router.post(`/client/:id/addNewLook`, uploadCloud.single('photo'), (req, res, next) => {
  const imgPath = req.file.url
  const look = req.body.newLook
  const client = req.params.id
  console.log(look, client)
  Looks.create({
    client: client,
    lookDescription: look,
    picture: imgPath,
  })
    .then((look) => {
      Client.findOneAndUpdate({ _id: client }, { $push: { looks: look._id } }, { new: true })
        .populate("looks")
        .then((clientData) => { res.json(clientData) })
        .catch(err => console.log("Hubo un error!", err))
    }).catch(err => console.log("Hubo un error!", err))
})


router.post('/clientData', (req, res, next) => {
  Client
    .findById(req.body.clientID)
    .populate("looks")
    .populate("infos")
    .then((client) => { res.json(client) })
    .catch(err => console.log("Hubo un error!", err))
});


router.post(`/client/:id/addNewInfo`, (req, res, next) => {
  const info = req.body.newInfo
  const client = req.params.id
  const infoTitle = req.body.infoTitle
  console.log(infoTitle)
  ClientInfo.findOneAndUpdate({ infoTitle: infoTitle, client: client }, { $push: { infoData: info } }, { new: true })
    .then((info) => {
      console.log(info)
      res.json(info)
    }).catch(err => console.log("Hubo un error!", err))
})

router.post(`/addNewInfoBox`, (req, res, next) => {
  const infoTitle = req.body.infoTitle
  const clientID = req.body.clientID
  console.log(infoTitle)
  console.log(clientID)
  ClientInfo.create({
    client: clientID,
    infoTitle: infoTitle,
  }).then((info) => {
    console.log(info)
    Client.findByIdAndUpdate(clientID, { $push: { infos: info._id } }, { new: true })
      .populate("infos")
      .then((client) => res.json(client))
      .catch(err => console.log("Hubo un error!", err))
  }).catch(err => console.log("Hubo un error!", err))
})

// router.get(`/client/:id/allLooks`, (req, res, next) => {
//   const client = req.params.id
//   Client.findById(client)
//     .populate("looks")
//     .then((allLooks) => { res.json(allLooks) })
//     .catch(err => console.log("Hubo un error!", err))
// })


module.exports = router;


