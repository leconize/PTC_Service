var models = require('../models')
var express = require('express')
var router = express.Router()
router.get('/children', (req, res) => {
  models.Children.findAll().then((children) => {
    res.json(children)
  })
})

// /children/3
router.get('/children/:id', (req, res) => {
  models.Children.findAll({
    where: {
      id: req.params.id
    }
  }).then((child) => {
    res.json(child)
  })
})

router.post('/children', (req, res) => {
  models.Children.create(req.body).then((child) => {
    res.json(child)
  })
})

router.delete('/children/:id', (req, res) => {
  models.Children.destroy({
    where: {
      id: req.params.id
    }
  }).then((data) => {
    res.json(data)
  })
})

router.get('/children/:id/image', (req, res) => {
  models.Children.findById(req.params.id).then((children) => {
    if (children === null) {
      res.status(404)
      res.send({error: 'Not Found'})
    } else {
      res.json(children)
    }
  }).catch((error) => {
    res.status(404)
    res.send({error: error.name})
  })
})

module.exports = router
