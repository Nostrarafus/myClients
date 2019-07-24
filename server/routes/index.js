const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Client = require('../models/Client');

/* GET home page */
// router.get('/nada', (req, res, next) => {
//   res.render('index');
// });



router.get(('/gamePage/:id'), (req, res, next) => {
  Game
    .findById(req.params.id)
    .populate('creator')
    .populate('guest')
    .then(game => {
      console.log('ritaaaaaaa')
      console.log(game)
      getRandomWord()
        .then((data) => {
          game.currentUserIsTheCreatorOfThisGame = false
          game.currentUserIsTheGuestOfThisGame = false
          if (game.creator._id.toString() === req.session.passport.user.toString()) {
            game.currentUserIsTheCreatorOfThisGame = true
          } else {
            game.currentUserIsTheGuestOfThisGame = true
          }
          res.render('gamePage', { game, data });
        })
    }).catch(err => console.log(err))
})


router.post('/addClient', (req, res, next) => {
const user = req.user._id
const client = req.body
console.log(client)
// Client
// .create({
//   owner: user,
//   clientName: 

// })


  // const { clientName } = req.body
  // if (!clientName) {
  //   next(new Error('You must provide some name'));
  // }
  // Client.findOne({ clientName })
  //   .then(foundClient => {
  //     if (foundClient) throw new Error('Clientname already exists');

  //     return new Client({
  //       clientName
  //     }).save();
  //   })
})

router.post("/gamePage", (req, res, next) => {
  User.findOne({ username: req.body.guest })
    .then((guest) => {
      let invited = guest._id;
      let creator = req.user._id
      Game
        .create({
          creator: req.user._id,
          guest: guest._id,
          winner: ""
        })
        .then(created => {
          let gameId = created._id
          User.findByIdAndUpdate(creator, { $push: { createdGames: gameId } }, { new: true })
            .then(creator => {
              User.findByIdAndUpdate(invited, { $push: { invitedGames: gameId } }, { new: true })
                .then(paco => {
                  res.redirect(`gamePage/${gameId}`)
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))
        }).catch((err) => console.log(err))
    }).catch((err) => console.log(err))
});


module.exports = router;
