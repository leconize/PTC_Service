var models = require('../models')
var express = require('express')
var router = express.Router()

router.get('/classroom', (req, res) => {
  models.Classroom.findAll().then((classroom) => {
    res.json(classroom)
  })
})

router.get('/classroom/:id', (req, res) => {
  models.Classroom.findByid(req.params.id).then((classroom) => {
    if (classroom === null) {
      res.status(404)
      res.send({error: 'Not Found'})
    } else {
      res.json(classroom)
    }
  })
})

router.post('/classroom', (req, res) => {
  models.Classroom.create(req.body)
    .then((classroom) => {
      res.json(classroom)
    })
    .catch((error) => {
      res.status(404)
      res.send({error: error})
    })
})

router.delete('/classroom/:id', (req, res) => {
  models.Classroom.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((isSuccess) => {
      if (isSuccess) {
        res.send('Delete is successed')
      } else {
        res.status(404)
        res.send({error: 'Resource not found'})
      }
    }).catch((error) => {
      res.status(404)
      res.send({error: error.name})
    })
})

module.exports = router
