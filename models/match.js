'use strict';
module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define('Match', {
    link: DataTypes.STRING,
    player1: DataTypes.STRING,
    player2: DataTypes.STRING,
    date: DataTypes.STRING,
    parsedDate: DataTypes.DATE,
    location: DataTypes.STRING,
    sport: DataTypes.STRING,
  }, {});
  Match.associate = function(models) {
    // associations can be defined here
  };
  return Match;
};