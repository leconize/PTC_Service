var models = require('../models')
var express = require('express')
var multer = require('multer')
var fs = require('fs')
var path = require('path')
var upload = multer({ dest: path.join(__dirname, '/detail') }).any()
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

router.post('/detail/:id/image', (req, res) => {
  var fileType = ['.png', '.jpg', '.jpeg']
  upload(req, res, (err) => {
    if (err) {
      res.status(404)
      res.send({ error: err.name })
    } else {
      var typeError = true
      // loop check fileType of image
      for (var i = 0; i < fileType.length; i++) {
        if (path.extname(req.files[0].originalname).toLowerCase() === fileType[i]) {
          typeError = false
          var targetPath = path.join(__dirname, '/detail/' + req.params.id + fileType[i])
          fs.rename(req.files[0].path, targetPath, (err) => {
            if (err) throw err
            models.ChildrenDetail.find({ where: { id: req.params.id } }).then((detail) => {
              var updateError = false
              if (detail) {
                detail.updateAttributes({
                  imagePath: targetPath
                }).catch((error) => {
                  updateError = true
                  res.send({ error: error.name })
                })
                if (updateError) res.json('Record path fail!')
                else res.json('Record path complete!')
              }
            }).catch((error) => {
              res.status(404)
              res.json({ error: error.name })
            })
          })
        }
      }
      // invalid fileType of image
      if (typeError) {
        res.json('Invalid fileType.')
      }
      console.log(req.body, 'Body')
      console.log(req.files, 'files')
    }
  })
})

router.get('/detail/:id/image', (req, res) => {
  models.ChildrenDetail.findById(req.params.id).then((detail) => {
    if (detail === null) {
      res.status(404)
      res.send({ error: 'Not Found' })
    } else {
      res.sendfile(detail.imagePath)
    }
  }).catch((error) => {
    res.status(404)
    res.send({ error: error.name })
  })
})

module.exports = router
