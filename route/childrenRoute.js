var models = require('../models')
var express = require('express')
var multer = require('multer')
var fs = require('fs')
var path = require('path')

var upload = multer({ dest: path.join(__dirname, '/children') }).any()

var router = express.Router()
router.get('/children', (req, res) => {
  models.Children.findAll().then((children) => {
    res.json(children)
  })
})

// /children/3
router.get('/children/:id', (req, res) => {
  models.Children.findAll({
    where: {
      id: req.params.id
    }
  }).then((child) => {
    res.json(child)
  })
})

router.post('/children', (req, res) => {
  models.Children.create(req.body).then((child) => {
    res.json(child)
  })
})

router.delete('/children/:id', (req, res) => {
  models.Children.destroy({
    where: {
      id: req.params.id
    }
  }).then((data) => {
    res.json(data)
  })
})

router.post('/children/:id/image', (req, res) => {
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
          var targetPath = path.join(__dirname, '/children/' + req.params.id + fileType[i])
          fs.rename(req.files[0].path, targetPath, (err) => {
            if (err) throw err
            models.Children.find({ where: { id: req.params.id } }).then((children) => {
              var updateError = false
              if (children) {
                children.updateAttributes({
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

router.get('/children/:id/image', (req, res) => {
  models.Children.find({attributes: ['imagePath']}, {where: {id: req.params.id}}).then((children) => {
    res.send(children)
  })
})

module.exports = router
