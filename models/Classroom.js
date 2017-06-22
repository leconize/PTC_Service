module.exports = function (sequelize, DataTypes) {
  var Classroom = sequelize.define('Classroom', {
    grade: DataTypes.INTEGER(11),
    className: DataTypes.STRING
  }, {
    timestamps: false
  })
  return Classroom
}
