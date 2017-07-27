module.exports = function (sequelize, DataTypes) {
  var Teacher = sequelize.define('teacher', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    userid: DataTypes.INTEGER,
    classid: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      reference: {
        models: 'Classroom',
        key: 'id',
        as: 'classid'
      }}
  }, {
    timestamps: false
  })

  Teacher.associate = (models) => {
    Teacher.belongsTo(models.Classroom, {foreignKey: 'classid', targetKey: 'id'})
  }

  return Teacher
}
