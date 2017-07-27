module.exports = function (sequelize, DataTypes) {
  var Teacher = sequelize.define('teacher', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    userid: DataTypes.INTEGER,
    classid: DataTypes.INTEGER
  }, {
    timestamps: false
  })
  return Teacher
}
