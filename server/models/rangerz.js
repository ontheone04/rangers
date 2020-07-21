'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rangerz = sequelize.define('Rangerz', {
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    series: DataTypes.STRING,
    wave: DataTypes.STRING,
    description: DataTypes.STRING,
    photo: DataTypes.STRING,
    photo1: DataTypes.STRING,
    photo2: DataTypes.STRING,
    photo3: DataTypes.STRING,
    photo4: DataTypes.STRING,
    photo5: DataTypes.STRING
  }, {});
  Rangerz.associate = function(models) {
    // associations can be defined here
    Rangerz.belongsToMany(models.User,{
      through:"Userranger", as:"users", foreignKey:"rangerid"
    })
  };
  return Rangerz;
};