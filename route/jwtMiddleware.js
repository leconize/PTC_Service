var router = require('express').Router()
var auth = require('../utils/auth')
router.all('*', (req, res, next) => {
  console.log(req.path)
  if (req.method === 'OPTIONS' || req.path === '/user/login' || req.path === '/status' ||
  (req.path === '/user' && req.method === 'POST') || req.path.match('/user/email')) {
    next()
  } else {
    var token = req.headers['authorization']
    if (token) {
      auth.verifyJWTToken(token.replace('Bearer ', '')).then((decodeToken) => {
        req.decodeToken = decodeToken
        next()
      }).catch((error) => {
        return res.status(403).json({
          error: error
        })
      })
    } else {
      return res.status(403).json({
        success: false,
        message: 'No token provide'
      })
    }
  }
})

module.exports = router
