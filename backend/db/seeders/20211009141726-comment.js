'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [
      {
        userId: 1,
        questionId: 2,
        body: "Hands down the best anime of all time is Naruto",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        questionId: 2,
        body: "Im not sure, the owl always took a bite before the commercial ended",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        questionId: 5,
        body: "When you find out let me know because man do I suck!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {truncate: true, cascade: true, restartIdentity: true
    });
  }
};
