// var express = require('express')
var Sequelize = require('sequelize')

var sequelize = new Sequelize('test', 'root', '', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });