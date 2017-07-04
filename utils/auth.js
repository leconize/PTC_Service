var jwt = require('jsonwebtoken')

function verifyJWTToken (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'SecretHaha', (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err)
      }
      resolve(decodedToken)
    })
  })
}

function createJWToken (details) {
  if (typeof details !== 'object') {
    details = {}
  }

  if (!details.maxAge || typeof details.maxAge !== 'number') {
    details.maxAge = 10368000 // four month
  }

  if (details.sessionData) {
    let temp = {}
    for (let key in details.sessionData) {
      if (typeof details.sessionData[key] !== 'function' && key !== 'password') {
        temp[key] = details.sessionData[key]
      }
    }
    details.sessionData = temp
  } else {
    details.sessionData = {}
  }

  let token = jwt.sign({
    data: details.sessionData
  }, 'SecretHaha', {
    expiresIn: details.maxAge,
    algorithm: 'HS256'
  }
  )

  return token
}

exports.verifyJWTToken = (token) => {
  return verifyJWTToken(token)
}

exports.createJWToken = (details) => {
  return createJWToken(details)
}
