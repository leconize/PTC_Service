var security = require('../utils/security')
var router = require('express').Router()
var models = require('../models')

router.get('/children/:id/secretkey', (req, res) => {
  models.Children.findById(req.params.id).then((children) => {
    var secretKey = security.encrypt('c' + req.params.id)
    res.json(secretKey)
  })
})

router.get('/classroom/:id/secretkey', (req, res) => {
  models.Classroom.findById(req.params.id).then((classroom) => {
    var secretKey = security.encrypt('C' + req.params.id)
    res.json(secretKey)
  })
})

router.get('/validate/:secretkey', (req, res) => {
  try {
    var decryptText = security.decrypt(String(req.params.secretkey))
  } catch (error) {
    res.status(400).json({error: 'secretkey error'})
  }
  var id = null
  if (decryptText.charAt(0) === 'c') {
    id = decryptText.substring(1)
    models.Children.findById(id, {attributes: ['id', 'nickname'],
      include: [models.Classroom]}).then((children) => {
      if (children) {
        res.json({
          data: children,
          type: 'children'}
        )
      } else {
        res.status(400).json({error: 'secretkey error'})
      }
    })
  } else if (decryptText.charAt(0) === 'C') {
    id = decryptText.substring(1)
    models.Classroom.findById(id, {includes: [models.Children]}).then((classroom) => {
      if (classroom) {
        res.json({
          data: classroom,
          type: 'classroom'
        })
      } else {
        res.status(400).json({error: 'secretkey error'})
      }
    })
  } else {
    res.status(400).json({
      error: 'invalid request'
    })
  }
})
module.exports = router
