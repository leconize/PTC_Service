var models = require('../models')
var express = require('express')
var router = express.Router()

router.get('/school', (req, res) => {
  models.School.findAll().then((school) => {
    res.json(school)
  })
})

router.get('/school/:id', (req, res) => {
  models.School.findById(req.params.id).then((school) => {
    if (school === null) {
      res.status(404)
      res.send({error: 'Not Found'})
    } else {
      res.json(school)
    }
  })
})

router.post('/school', (req, res) => {
  models.School.create(req.body).then((school) => {
    res.json(school)
  }).catch((error) => {
    res.status(404)
    res.send({error: error.name})
  })
})

router.delete('/school/:id', (req, res) => {
  models.School.destroy({
    where: {
      id: req.params.id
    }
  }).then((data) => {
    res.json(data)
  }).catch((error) => {
    res.status(400)
    res.send({error: error.name})
  })
})

module.exports = router
