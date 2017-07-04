var describe = require('mocha').describe
var it = require('mocha').it
var expect = require('chai').expect

describe('this program load model from models/index', function () {
  var models = require('../../models')
  it('have the Children model', function () {
    expect(models.Children).to.be.a('function')
  })

  it('have the Classroom Model', function () {
    expect(models.Classroom).to.be.a('function')
  })
  it('have the Message Model', function () {
    expect(models.message).to.be.a('function')
  })
  it('have the Parent Model', function () {
    expect(models.parent).to.be.a('function')
  })
  it('have the School Model', function () {
    expect(models.School).to.be.a('function')
  })
  it('have the Teacher Model', function () {
    expect(models.teacher).to.be.a('function')
  })
})
