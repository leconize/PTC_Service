var express = require('express')
var bodyParser = require('body-parser')

var app = express()

var childrens = require('./route/childrenRoute')
var school = require('./route/schoolRoute')
var childrenDetails = require('./route/childrenDetailRoute')

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
//   extended: false
// }))

app.use('/', childrens)
app.use('/', school)
app.use('/', childrenDetails)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
