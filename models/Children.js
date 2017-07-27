module.exports = function (sequelize, DataTypes) {
  var Children = sequelize.define('Children', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    nickname: DataTypes.STRING,
    birthday: DataTypes.DATE,
    desc: DataTypes.TEXT,
    imagePath: DataTypes.STRING,
    studentId: DataTypes.STRING,
    allergy: DataTypes.STRING,
    bloodgroup: DataTypes.STRING,
    secretCode: DataTypes.STRING,
    classid: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      reference: {
        models: 'Classroom',
        key: 'id',
        as: 'classid'
      }
    }
  }, {
    timestamps: false
  })

  Children.associate = (models) => {
    Children.hasMany(models.ChildrenDetail, {foreignKey: 'children_id'})
    Children.belongsTo(models.Classroom, {foreignKey: 'classid', targetKey: 'id'})
  }

  return Children
}
