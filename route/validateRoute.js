var security = require('../utils/security')
var router = require('express').Router()
var models = require('../models')

router.get('/children/:id/secretkey', (req, res) => {
  models.Children.findById(req.params.id).then((children) => {
    var secretKey = security.encrypt('children id is' + req.params.id)
    res.json(secretKey)
  })
})

router.get('/classroom/:id/secretkey', (req, res) => {
  models.Classroom.findById(req.params.id).then((classroom) => {
    var secretKey = security.encrypt('classroom id is' + req.params.id)
    res.json(secretKey)
  })
})

router.get('/validate/:secretkey', (req, res) => {
  var decryptText = security.decrypt(String(req.params.secretKey))
  var id = null
  if (decryptText.indexOf('children') !== 1) {
    id = decryptText.replace('children  id is', '')
    models.Children.findById(id).then((children) => {
      res.json(children)
    })
  } else if (decryptText.indexOf('classroom') !== 1) {
    id = decryptText.replace('classroom id is', '')
    models.Classroom.findById(id).then((classroom) => {
      res.json(classroom)
    })
  } else {
    res.status(400).json({
      error: 'invalid request'
    })
  }
})
module.exports = router
