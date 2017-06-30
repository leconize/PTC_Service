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

router.get('/children/:id/image', (req, res) => {
  models.Children.findById(req.params.id).then((children) => {
    if (children === null) {
      res.status(404)
      res.send({ error: 'Not Found' })
    } else {
      res.json(children)
    }
  }).catch((error) => {
    res.status(404)
    res.send({ error: error.name })
  })
})

router.post('/children/:id/image', (req, res) => {
  var targetPath = path.resolve(path.join(__dirname, '/children/' + req.params.id + '.png'))
  upload(req, res, (err) => {
    if (err) {
      res.status(404)
      res.send({ error: err.name })
    } else {
      if (path.extname(req.files[0].originalname).toLowerCase() === '.png') {
        fs.rename(req.files[0].path, targetPath, (err) => {
          if (err) throw err
          models.Children.find({ where: { id: req.params.id } }).then((children) => {
            if (children) {
              children.updateAttributes({
                imagePath: targetPath
              }).catch((error) => {
                res.send({ error: error.name })
              })
            }
          }).catch((error) => {
            res.status(404)
            res.send({ error: error.name })
          })
          console.log('Upload completed!')
        })
      } else {
        fs.unlink(String(upload), () => {
          if (err) throw err
          console.error('Only .png files are allowed!')
        })
      }
      console.log(req.body, 'Body')
      console.log(req.files, 'files')
      res.send('Successed')
    }
  })
})

module.exports = router
