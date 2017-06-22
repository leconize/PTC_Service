
module.exports = function (sequelize, DataTypes) {
  var ChildrenDetail = sequelize.define('ChildrenDetail', {
    children_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    calAll: DataTypes.STRING,
    entryTime: DataTypes.TIME,
    exitTime: DataTypes.TIME,
    learning: DataTypes.INTEGER,
    lunch: DataTypes.INTEGER,
    medicine: DataTypes.INTEGER,
    nap: DataTypes.INTEGER,
    comment: DataTypes.TEXT

  }, {
    timestamps: false
  })

  ChildrenDetail.associate = (models) => {
    ChildrenDetail.belongsTo(models.Children, {foreignKey: 'children_id'})
  }

  return ChildrenDetail
}
