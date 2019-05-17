'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sport:  {
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.STRING
      },
      player1: {
        type: Sequelize.STRING
      },
      player2: {
        type: Sequelize.STRING
      },
      dateStr:  {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      location:  {
        type: Sequelize.STRING
      },
      odd1Str:  {
        type: Sequelize.STRING
      },
      odd2Str:  {
        type: Sequelize.STRING
      },
      odd1:  {
        type: Sequelize.FLOAT
      },
      odd2:  {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Matches');
  }
};