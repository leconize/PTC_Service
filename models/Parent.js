
module.exports = function (sequelize, DataTypes) {
  var Parent = sequelize.define('Parent', {
   email: DataTypes.STRING,
   imagePath: DataTypes.STRING,
   password: DataTypes.STRING

  })
  return Parent
}
