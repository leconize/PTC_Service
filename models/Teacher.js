module.exports = function (sequelize, DataTypes) {
  var Teacher = sequelize.define('teacher', {
    nameTh: DataTypes.STRING,
    nameEng: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    timestamps: false
  })
  return Teacher
}
