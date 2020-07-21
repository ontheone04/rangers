'use strict';
module.exports = (sequelize, DataTypes) => {
  const Userranger = sequelize.define('Userranger', {
    userid: DataTypes.INTEGER,
    rangerid: DataTypes.INTEGER
  }, {});
  Userranger.associate = function(models) {
    // associations can be defined here
  };
  return Userranger;
};