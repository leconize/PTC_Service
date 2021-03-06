var models = require('../models')
var express = require('express')
var router = express.Router()

router.get('/message', (req, res) => {
  models.message.findAll().then((message) => {
    res.json(message)
  })
})

router.get('/message/:id', (req, res) => {
  models.message.findById(req.params.id).then((message) => {
    if (message === null) {
      res.status(404)
      res.send({error: 'Not Found'})
    } else {
      res.json(message)
    }
  }).catch((error) => {
    res.status(404)
    res.send({error: error.name})
  })
})

router.post('/message', (req, res) => {
  models.message.create(req.body).then((message) => {
    res.json(message)
  }).catch((error) => {
    res.status(404)
    res.send({error: error.name})
  })
})

router.delete('/message/:id', (req, res) => {
  models.message.destroy({
    where: {
      id: req.params.id
    }
  }).then((isSuccess) => {
    if (isSuccess) {
      res.send('Delete is Successed')
    } else {
      res.status(404)
      res.send({error: 'Not Found'})
    }
  }).catch((error) => {
    res.status(400)
    res.send({error: error.name})
  })
})

module.exports = router
