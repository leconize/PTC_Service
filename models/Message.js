module.exports = function (sequelize, DataTypes) {
  var Message = sequelize.define('message', {
    message: DataTypes.STRING,
    time: DataTypes.TIME,
    isRead: DataTypes.INTEGER
  })

  return Message
}
