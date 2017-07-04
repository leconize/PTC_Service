var models = require('../models')
var express = require('express')
var router = express.Router()

router.get('/detail', (req, res) => {
  models.ChildrenDetail.findAll().then((detail) => {
    res.json(detail)
  })
})

router.get('/detail/:id', (req, res) => {
  models.ChildrenDetail.findById(req.params.id).then((childrenDetail) => {
    if (childrenDetail === null) {
      res.status(404)
      res.send({ error: 'Not Found' })
    } else {
      res.json(childrenDetail)
    }
  })
})

router.post('/detail', (req, res) => {
  models.ChildrenDetail.create(req.body)
    .then((detail) => {
      res.json(detail)
    })
    .catch((error) => {
      res.status(400)
      res.send({ error: error.name })
    })
})

router.delete('/detail/:id', (req, res) => {
  models.ChildrenDetail.destroy({
    where: {
      id: req.params.id
    }
  }).then((isSuccess) => {
    if (isSuccess) {
      res.send('Delete is successed')
    } else {
      res.status(404)
      res.send({error: 'Resource not found'})
    }
  }).catch((error) => {
    res.status(400)
    res.send({error: error.name})
  })
})

module.exports = router
