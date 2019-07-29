const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Client = require('../models/Client');
const uploadCloud = require('../config/cloudinary.js');
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
      User.findOneAndUpdate({ _id: req.user._id }, { $push: { clients: client._id } }, { new: true })
        .then((x) => {
          Client.find({ owner: currentuser })
            .then((allClients) => { res.json(allClients) })
            .catch(err => console.log("Hubo un error!", err))
        }).catch(err => console.log("Hubo un error!", err))
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
  User.findOneAndUpdate({ _id: req.user._id }, { $push: { picture: { imgName: imgName, imgPath: imgPath } } }, { new: true })
    .then(photo => {
      res.json({ url: req.file.url });
    })
    .catch(error => {
      console.log(error);
    })
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
      let sentLook = look
      Client.findOneAndUpdate({ _id: client }, { $push: { looks: look._id } }, { new: true })
        .then(() => { res.json(sentLook) })
        .catch(err => console.log("Hubo un error!", err))
    }).catch(err => console.log("Hubo un error!", err))
})


router.get('/client/:id', (req, res, next) => {
  Client
    .find({ _id: req.params.id })
    .populate("looks")
    .populate("infos")
    .then((allClients) => { res.json(allClients) })
    .catch(err => console.log("Hubo un error!", err))
});


router.post(`/client/:id/addNewInfo`, (req, res, next) => {
  const info = req.body.newInfo
  const client = req.params.id
  const hobbies = req.body.hobbies
  console.log(info)
  ClientInfo.create({
    client: client,
    info: {
      infoClass: hobbies,
      infoData: info,
    }
  })
    .then((info) => {
      let sentinfo = info
      console.log(sentinfo)
      Client.findOneAndUpdate({ _id: client }, { $push: { infos: info._id } }, { new: true })
        .then(() => { res.json(sentinfo) })
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


