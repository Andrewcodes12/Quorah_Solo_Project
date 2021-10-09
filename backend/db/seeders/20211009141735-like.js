'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Likes', [
      {
        userId: 1,
        questionId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        questionId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        questionId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {returning: true});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Likes', null, {truncate: true, cascade: true, restartIdentity: true
    });
  }
};
