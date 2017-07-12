var express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var https = require('https')
var fs = require('fs')
var path = require('path')
var app = express()

var childrens = require('./route/childrenRoute')
var school = require('./route/schoolRoute')
var childrenDetails = require('./route/childrenDetailRoute')
var parent = require('./route/parentRoute')
var classroom = require('./route/classroomRoute')
var message = require('./route/messageRoute')
var teacher = require('./route/teacherRoute')
var user = require('./route/userRoute')
var auth = require('./route/jwtMiddleware')

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
//   extended: false
// }))
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
app.use(require('express-status-monitor')())
app.use(require('helmet')())
app.use(morgan('dev', {stream: accessLogStream}))
app.use(express.static('static'))
app.use(auth)
app.use('/', user)
app.use('/', childrens)
app.use('/', school)
app.use('/', childrenDetails)
app.use('/', parent)
app.use('/', classroom)
app.use('/', message)
app.use('/', teacher)
app.use(morgan('dev'))
const option = {
  cert: fs.readFileSync('./ssl-key/fullchain.pem'),
  key: fs.readFileSync('./ssl-key/privkey.pem')
}
https.createServer(option, app).listen(4000)
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

module.exports = app
