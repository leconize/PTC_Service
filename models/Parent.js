
module.exports = function (sequelize, DataTypes) {
  var Parent = sequelize.define('parent', {
    imagePath: DataTypes.STRING,
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    userid: DataTypes.INTEGER
  }, {
    timestamps: false
  })
  return Parent
}
