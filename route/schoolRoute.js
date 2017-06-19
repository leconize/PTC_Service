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

module.exports = router
