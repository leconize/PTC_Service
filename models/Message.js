
module.exports = function (sequelize, DataTypes) {
  var Message = sequelize.define('Message', {
    message: DataTypes.STRING,
    time: DataTypes.TIME,
    isRead: DataTypes.INTEGER

  })

  return Message
}
