var models = require('../models')
var express = require('express')
var router = express.Router()

router.get('/school', (req, res) => {
  models.School.findAll().then((school) => {
    res.json(school)
  })
})

router.get('/school/:id', (req, res) => {
  models.School.findAll({
    where: {
      id: req.param.id
    }
  }).then((school) => {
    res.json(school)
  })
})

router.post('/school', (req, res) => {
  models.School.create(req.body).then((school) => {
    res.json(school)
  })
})

router.delete('/school/:id', (req, res) => {
  models.School.destroy({
    where: {
      id: req.params.id
    }
  }).then((data) => {
    res.json(data)
  })
})

module.exports = router
