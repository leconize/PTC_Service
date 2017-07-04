var models = require('../models')
var express = require('express')
var multer = require('multer')
var fs = require('fs')
var path = require('path')
var upload = multer({ dest: path.join(__dirname, '/parent') }).any()
var router = express.Router()

router.get('/parent', (req, res) => {
  models.parent.findAll().then((parent) => {
    res.json(parent)
  })
})

router.get('/parent/:id', (req, res) => {
  models.parent.findById(req.params.id).then((parent) => {
    if (parent === null) {
      res.status(404)
      res.send({ error: 'Not Found' })
    } else {
      res.json(parent)
    }
  }).catch((error) => {
    res.status(404)
    res.send({ error: error.name })
  })
})

router.post('/parent', (req, res) => {
  models.parent.create(req.body).then((parent) => {
    res.json(parent)
  }).catch((error) => {
    res.status(404)
    res.send({ error: error.name })
  })
})

router.delete('/parent/:id', (req, res) => {
  models.parent.destroy({
    where: {
      id: req.params.id
    }
  }).then((isSuccess) => {
    if (isSuccess) {
      res.send('Delete is Successed')
    } else {
      res.status(404)
      res.send({ error: 'Not Found' })
    }
  }).catch((error) => {
    res.status(400)
    res.send({ error: error.name })
  })
})

router.post('/parent/:id/image', (req, res) => {
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
          var targetPath = path.join(__dirname, '/parent/' + req.params.id + fileType[i])
          fs.rename(req.files[0].path, targetPath, (err) => {
            if (err) throw err
            models.parent.find({ where: { id: req.params.id } }).then((parent) => {
              var updateError = false
              if (parent) {
                parent.updateAttributes({
                  imagePath: targetPath
                }).catch((error) => {
                  updateError = true
                  res.send({ error: error.name })
                })
                if (updateError) res.send('Record path fail!')
                else res.send('Record path complete!')
              }
            }).catch((error) => {
              res.status(404)
              res.send({ error: error.name })
            })
          })
        }
      }
      // invalid fileType of image
      if (typeError) {
        res.send('Invalid fileType.')
      }
      console.log(req.body, 'Body')
      console.log(req.files, 'files')
    }
  })
})

router.get('/parent/:id/image', (req, res) => {
  models.parent.findById(req.params.id).then((parent) => {
    if (parent === null) {
      res.status(404)
      res.send({ error: 'Not Found' })
    } else {
      res.sendfile(parent.imagePath)
    }
  }).catch((error) => {
    res.status(404)
    res.send({ error: error.name })
  })
})

module.exports = router
