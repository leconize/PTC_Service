module.exports = function (sequelize, DataTypes) {
  var Classroom = sequelize.define('Classroom', {
    grade: DataTypes.STRING,
    className: DataTypes.STRING
  })
  return Classroom
}
