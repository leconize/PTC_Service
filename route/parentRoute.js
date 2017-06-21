var models = require('../models')
var express = require('express')
var router = express.Router()

router.get('/parent', (req, res) => {
  models.parent.findAll().then((parent) => {
    res.json(parent)
  })
})

router.get('/parent/:id', (req, res) => {
  models.parent.findById(req.params.id).then((parent) => {
    if (parent === null) {
      res.status(404)
      res.send({error: 'Not Found'})
    } else {
      res.json(parent)
    }
  }).catch((error) => {
    res.status(404)
    res.send({error: error.name})
  })
})

router.post('/parent', (req, res) => {
  models.parent.create(req.body).then((parent) => {
    res.json(parent)
  }).catch((error) => {
    res.status(404)
    res.send({error: error.name})
  })
})

router.delete('/parent/:id', (req, res) => {
  models.parent.destroy({
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
