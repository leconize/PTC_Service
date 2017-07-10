
module.exports = function (sequelize, DataTypes) {
  var Parent = sequelize.define('parent', {
    email: DataTypes.STRING,
    imagePath: DataTypes.STRING,
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING
  }, {
    timestamps: false
  })
  return Parent
}
