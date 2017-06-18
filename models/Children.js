
module.exports = function (sequelize, DataTypes) {
  var Children = sequelize.define('Children', {
    nameTh: DataTypes.STRING,
    nameEng: DataTypes.STRING,
    nickname: DataTypes.STRING,
    birthday: DataTypes.DATE,
    desc: DataTypes.TEXT,
    imagePath: DataTypes.STRING

  })

  return Children
}
