var models = require('../models')
var express = require('express')
var router = express.Router()
router.get('/', (req, res) => {
  models.Children.findAll().then(() => {
    console.log(req.body)
  })
})

module.exports = router
