
module.exports = function (sequelize, DataTypes) {
  var ChildrenDetail = sequelize.define('childrendetail', {
    nameTh: DataTypes.STRING,
    nameEng: DataTypes.STRING,
    nickname: DataTypes.STRING,
    birthday: DataTypes.DATE,
    desc: DataTypes.TEXT,
    imagePath: DataTypes.STRING
  })

  return ChildrenDetail
}