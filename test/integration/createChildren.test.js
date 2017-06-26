var app = require('../../app')
var expect = require('chai').expect

let describe = require('mocha').describe

let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()

console.log(chai.should)

chai.use(chaiHttp)

describe('Children', function () {
  before(function () {
    return require('../../models').sequelize.sync()
  })

  beforeEach(function () {
    this.models = require('../../models')
  })

  it('load correctly', function (done) {
    chai.request(app).get('/children').end((err, res) => {
      res.should.have.status(200)
      expect(res.body).to.be.a('array')
      done()
    })
  })
})
