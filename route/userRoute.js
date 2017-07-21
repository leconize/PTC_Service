var models = require('../models')
var express = require('express')
var router = express.Router()
var security = require('../utils/security')
var jwt = require('../utils/auth')

router.get('/user', (req, res) => {
  console.log(req.query)
  models.User.findAll({
    attributes: ['id', 'email', 'role'],
    where: req.query
  }).then((user) => {
    if (user.length === 0) {
      res.status(404).json(
        { error: 'Record not found'
        })
    } else {
      res.json(user)
    }
  }).catch((error) => {
    res.status(400).json({error: error.name})
  })
})

router.get('/user/:id', (req, res) => {
  models.User.findAll({
    attributes: ['id', 'email', 'role'],
    where: {
      id: req.params.id
    }
  }).then((child) => {
    res.json(child)
  })
})

router.post('/user', (req, res) => {
  req.body.user.password = security.encrypt(req.body.user.password)
  console.log(req.body)
  if (req.body.user.role === 'teacher') {
    models.User.create(req.body.user).then((user) => {
      req.body.data.userid = user.id
      models.teacher.create(req.body.data).then((teacher) => {
        delete user.dataValues.password
        res.json(user)
      })
    }).catch((error) => {
      res.status(400).json(error)
    })
  } else if (req.body.user.role === 'parent') {
    models.User.create(req.body.user).then((user) => {
      req.body.data.userid = user.id
      models.parent.create(req.body.data).then((parent) => {
        let id = req.body.children.id
        delete req.body.children.id
        models.Children.update(req.body.children, {where: {id: id}}).then((children) => {
          delete user.dataValues.password
          res.json(user)
        })
      })
    }).catch((error) => {
      res.status(400).json(error)
    })
  }
})

router.delete('/user/:id', (req, res) => {
  models.User.destroy({
    where: {
      id: req.params.id
    }
  }).then((data) => {
    res.json(data)
  })
})

router.post('/user/login', (req, res) => {
  models.User.findOne({
    where: {
      email: req.body.email
    }
  }).then((user) => {
    if (user) {
      var token = jwt.createJWToken(user)
      if (security.decrypt(user.dataValues.password) === req.body.password) {
        delete user.dataValues.password
        user.dataValues.token = token
        res.json(user)
      } else {
        res.status(400).json({
          error: 'wrong password'
        })
      }
    } else {
      res.status(400).json({
        error: " can't find user that use this email"
      })
    }
  })
})

module.exports = router
