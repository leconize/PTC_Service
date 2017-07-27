module.exports = function (sequelize, DataTypes) {
  var Classroom = sequelize.define('Classroom', {
    grade: DataTypes.INTEGER(11),
    className: DataTypes.STRING
  }, {
    timestamps: false
  })

  Classroom.associate = (models) => {
    Classroom.hasMany(models.Children, {foreignKey: 'classid', sourceKey: 'id'})
  }
  return Classroom
}
