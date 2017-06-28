var models = require('../models')
var express = require('express')
var router = express.Router()
var security = require('../utils/security')

router.get('/user', (req, res) => {
  models.User.findAll().then((User) => {
    res.json(User)
  })
})

router.get('/user/:id', (req, res) => {
  models.User.findAll({
    where: {
      id: req.params.id
    }
  }).then((child) => {
    res.json(child)
  })
})

router.post('/user', (req, res) => {
  models.User.create(req.body).then((child) => {
    res.json(child)
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

module.exports = router
