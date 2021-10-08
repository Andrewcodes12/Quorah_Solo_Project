'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    userId: DataTypes.INTEGER,
    body: DataTypes.STRING
  }, {});
  Question.associate = function(models) {
    Question.belongsTo(models.User, {
      foreignKey: 'userId'
     });
     Question.hasMany(models.Comment, {
       foreignKey: 'questionId', onDelete: 'CASCADE', hooks: true
     })
     Question.hasMany(models.Like, {
       foreignKey: 'questionId', onDelete: 'CASCADE', hooks: true
     })
  };
  return Question;
};
