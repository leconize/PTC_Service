const express = require('express')
var bodyParser = require('body-parser');

const app = express()

var childrens = require('./route/childrenRoute')

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
//   extended: false
// }))

app.use('/', childrens)

app.get('/test', ()=> {console.log("test")})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
