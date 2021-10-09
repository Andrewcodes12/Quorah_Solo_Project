'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions', [
      {
        userId: 1,
        body: "What is the difference between React and HTML?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        body: "How many licks does it take to get to the center of a tootsie pop?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        body: "What is your favorite anime of all time?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        body: "Where is the best place to go skiing in the US?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        body: "How can I finally break 100 in golf?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        body: "Can anyone suggest a brunch spot in Miami?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Questions', null, {truncate: true, cascade: true, restartIdentity: true
   });
  }
};
