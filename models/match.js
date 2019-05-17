'use strict';
module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define('Match', {
    link: DataTypes.STRING,
    player1: DataTypes.STRING,
    player2: DataTypes.STRING,
    dateStr: DataTypes.STRING,
    date: DataTypes.DATE,
    location: DataTypes.STRING,
    sport: DataTypes.STRING,
    odd1: DataTypes.FLOAT,
    odd2: DataTypes.FLOAT,
    odd1Str: DataTypes.STRING,
    odd2Str: DataTypes.STRING,
  }, {});
  Match.associate = function(models) {
    // associations can be defined here
  };
  return Match;
};