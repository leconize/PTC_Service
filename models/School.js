
module.exports = function (sequelize, DataTypes) {
  var School = sequelize.define('School', {
    nameTh: DataTypes.STRING,
    nameEng: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  })

  return School
}
