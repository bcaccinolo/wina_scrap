'use strict';
module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define('Match', {
    link: DataTypes.STRING
  }, {});
  Match.associate = function(models) {
    // associations can be defined here
  };
  return Match;
};