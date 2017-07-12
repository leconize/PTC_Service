var models = require('../models')
var express = require('express')
var router = express.Router()
var security = require('../utils/security')
var jwt = require('../utils/auth')

router.get('/user', (req, res) => {
  console.log(req.query)
  models.User.findAll({
    attributes: ['id', 'email', 'role'],
    where: req.query
  }).then((user) => {
    if (user.length === 0) {
      res.status(404).json(
        { error: 'Record not found'
        })
    } else {
      res.json(user)
    }
  }).catch((error) => {
    res.status(400).json({error: error.name})
  })
})

router.get('/user/:id', (req, res) => {
  models.User.findAll({
    attributes: ['id', 'email', 'role'],
    where: {
      id: req.params.id
    }
  }).then((child) => {
    res.json(child)
  })
})

router.post('/user', (req, res) => {
  req.body.password = security.encrypt(req.body.password)
  models.User.create(req.body).then((user) => {
    delete user.dataValues.password
    res.json(user)
  })
})

router.delete('/user/:id', (req, res) => {
  models.User.destroy({
    where: {
      id: req.params.id
    }
  }).then((data) => {
    res.json(data)
  })
})

router.post('/user/login', (req, res) => {
  models.User.findOne({
    where: {
      email: req.body.email
    }
  }).then((user) => {
    if (user) {
      var token = jwt.createJWToken(user)
      if (security.decrypt(user.dataValues.password) === req.body.password) {
        delete user.dataValues.password
        user.dataValues.token = token
        res.json(user)
      } else {
        res.status(400).json({
          error: 'wrong password'
        })
      }
    } else {
      res.status(400).json({
        error: " can't find user that use this email"
      })
    }
  })
})

module.exports = router
