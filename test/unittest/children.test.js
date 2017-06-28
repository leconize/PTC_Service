var describe = require('mocha').describe
var it = require('mocha').it
var expect = require('chai').expect

describe('Children Model', function () {
  before(function () {
    var sequelize = require('../../models').sequelize
    sequelize.options.logging = false
    return sequelize.sync()
  })

  beforeEach(function () {
    this.Children = require('../../models').Children
  })

  describe('create', function () {
    it('create children', function () {
      var todayDate = new Date()
      return this.Children.create({nameTh: 'การทดสอบ',
        'nameEng': 'test',
        'nickname': 'fortesting',
        'birthday': todayDate,
        'desc': 'for testing only',
        'imagePath': 'this is the path'}).bind(this)
        .then(function (children) {
          expect(children.nameEng).to.equal('test')
          expect(children.nameTh).to.equal('การทดสอบ')
          expect(children.birthday).to.equal(todayDate)
          expect(children.desc).to.equal('for testing only')
          expect(children.imagePath).to.equal('this is the path')
        })
    })
  })
})
