var express = require('express')
var bodyParser = require('body-parser')

var app = express()

var childrens = require('./route/childrenRoute')
var school = require('./route/schoolRoute')
var childrenDetails = require('./route/childrenDetailRoute')
var parent = require('./route/parentRoute')
var classroom = require('./route/classroomRoute')
var message = require('./route/messageRoute')
var teacher = require('./route/teacherRoute')
var user = require('./route/userRoute')
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
//   extended: false
// }))
app.use('/', user)
app.use('/', childrens)
app.use('/', school)
app.use('/', childrenDetails)
app.use('/', parent)
app.use('/', classroom)
app.use('/', message)
app.use('/', teacher)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

module.exports = app
