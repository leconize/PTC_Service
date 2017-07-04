var models = require('../models')
var express = require('express')
var router = express.Router()

router.get('/teacher', (req, res) => {
  models.teacher.findAll().then((teacher) => {
    res.json(teacher)
  })
})

router.get('/teacher/:id', (req, res) => {
  models.teacher.findById(req.params.id).then((teacher) => {
    if (teacher === null) {
      res.status(404)
      res.send({error: 'Not Found'})
    } else {
      res.json(teacher)
    }
  }).catch((error) => {
    res.status(404)
    res.send({error: error.name})
  })
})

router.post('/teacher', (req, res) => {
  models.teacher.create(req.body).then((teacher) => {
    res.json(teacher)
  }).catch((error) => {
    res.status(404)
    res.send({error: error.name})
  })
})

router.delete('/teacher/:id', (req, res) => {
  models.teacher.destroy({
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
