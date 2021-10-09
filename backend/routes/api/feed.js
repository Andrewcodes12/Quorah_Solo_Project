// Create a router here
const express = require('express');
const router = express.Router();
// Since we're doing database stuff, you'll want some kind of asyncHandler
const asyncHandler = require('express-async-handler');

// Take a second to import the database stuff you'll need
const { User,Question,Comment,Like } = require('../../db/models');
// Here's where you'd also import other middleware

// Create the API route here
router.get('/', asyncHandler(async (req, res) => {
  const question = await Question.findAll({include:[User,Comment,Like]});
  res.json(question);
}));

// Remember to export the router, too
module.exports = router;
