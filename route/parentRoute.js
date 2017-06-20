var models = require('../models')
var express = require('express')
var router = express.Router()

router.get('/parent', (req, res) => {
  models.Parent.findAll().then((parent) => {
    res.json(parent)
  })
})
module.exports = router


