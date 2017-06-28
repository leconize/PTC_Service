var crypto = require('crypto')
const algorithm = 'aes-256-ctr'
const privateKey = 'SecretHaha'

function encrypt (password) {
  var cipher = crypto.createCipher(algorithm, privateKey)
  var crypted = cipher.update(password.toString(), 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

function decrypt (password) {
  var decipher = crypto.createDecipher(algorithm, privateKey)
  var dec = decipher.update(password, 'hex', 'utf8')
  dec += decipher.final('utf8')
  return dec
}

exports.decrypt = (password) => {
  return decrypt(password)
}

exports.encrypt = (password) => {
  return encrypt(password)
}
