const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Client = require('../models/Client');
const uploadCloud = require('../config/Cloudinary.js');
const Looks = require('../models/Looks')
const ClientInfo = require('../models/ClientInfo')
const Task = require('../models/Task')


router.post('/addClient', (req, res, next) => {
  const currentuser = req.user._id
  const client = req.body.clientName
  Client.create({
    owner: currentuser,
    clientName: client,
    picture: {
      imgName: "default",
      imgPath: "https://www.uic.mx/posgrados/files/2018/05/default-user.png"
    }
  })
    .then((client) => {
      const clientID = client._id
      Task.create({
        client: clientID,
        description: "Ejemplo: Leer su libro para la proxima reunión",
      }).then((task) => {
        Client.findByIdAndUpdate(clientID, { $push: { tasks: task._id } }, { new: true })
          .then(() => res.status(200))
      })
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

router.post(`/client/:id/addClientPic`, uploadCloud.single('photo'), (req, res, next) => {
  const clientID = req.params.id
  const imgPath = req.file.url
  const imgName = req.body.clientName
  Client.findOneAndUpdate({ _id: clientID }, { picture: { imgName: imgName, imgPath: imgPath } }, { new: true })
    .then(photo => {
      res.json(photo);
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
      Client.findOneAndUpdate({ _id: client }, { $push: { looks: look._id } }, { new: true })
        .populate("looks")
        .then((clientData) => { res.json(clientData) })
        .catch(err => console.log("Hubo un error!", err))
    }).catch(err => console.log("Hubo un error!", err))
})

router.post(`/client/:id/addNewLookFromCamera`, uploadCloud.single('photo'), (req, res, next) => {
  const clientID = req.params.id
  const imgPath = req.file
  console.log(imgPath)
  const imgName = req.body.newLook
  Looks.create({
    client: clientID,
    lookDescription: imgName,
    picture: imgPath,
  })
    .then((look) => {
      Client.findOneAndUpdate({ _id: clientID }, { $push: { looks: look._id } }, { new: true })
        .populate("looks")
        .then((clientData) => { res.json(clientData) })
        .catch(err => console.log("Hubo un error!", err))
    }).catch(err => console.log("Hubo un error!", err))

})

router.post('/deleteInfo', (req, res, next) => {
  const info = req.body.info
  const infoID = req.body.infoID
  console.log(infoID)
  ClientInfo.findByIdAndUpdate(infoID, { $pull: { infoData: info } }, { new: true })
    .then((info) => { res.json(info) })
    .catch(err => console.log("Hubo un error!", err))
});
router.post('/deleteLook', (req, res, next) => {
  const lookID = req.body.lookID
  const clientID = req.body.clientID
  Looks.deleteOne({ _id: lookID })
    .then(() => {
      Client.findById(clientID)
        .populate("looks")
        .then((task) => { res.json(task) })
        .catch(err => console.log("Hubo un error!", err))
    }).catch(err => console.log("Hubo un error!", err))
});

router.post('/deleteTaskInfo', (req, res, next) => {
  const taskID = req.body.taskID
  const clientID = req.body.clientID
  console.log(taskID)
  Task.deleteOne({ _id: taskID })
    .then(() => {
      Client.findById(clientID)
        .populate("tasks")
        .then((task) => { res.json(task) })
        .catch(err => console.log("Hubo un error!", err))
    }).catch(err => console.log("Hubo un error!", err))
});

router.post(`/addTask`, (req, res, next) => {
  const task = req.body.newTask
  const clientID = req.body.clientID
  Task.create({
    client: clientID,
    description: task,
  })
    .then((task) => {
      Client.findOneAndUpdate({ _id: clientID }, { $push: { tasks: task._id } }, { new: true })
        .populate("tasks")
        .then((clientData) => { res.json(clientData) })
        .catch(err => console.log("Hubo un error!", err))
    }).catch(err => console.log("Hubo un error!", err))
})


router.post('/clientData', (req, res, next) => {
  Client
    .findById(req.body.clientID)
    .populate("looks")
    .populate("infos")
    .populate("tasks")
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


router.post(`/toggle`, (req, res, next) => {
  const clientID = req.body.clientID
  const done = req.body.done
  const fav = req.body.fav
  const taskID = req.body.taskID
  Task.findByIdAndUpdate(taskID, { favourited: fav, done: done }, { new: true })
    .then(() => {
      Client.findById(clientID)
        .populate("tasks")
        .then((client) => res.json(client))
        .catch(err => console.log("Hubo un error!", err))
    }).catch(err => console.log("Hubo un error!", err))
})


module.exports = router;


