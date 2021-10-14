const express = require("express")
const router = express.Router()
const asyncHandler = require("express-async-handler")
const {check} = require("express-validator")
const { Question,User,Comment,Like } = require("../../db/models")
const {requireAuth,csrfProtection} = require('../../utils/auth')
const {handleValidationErrors} = require("../../utils/validation")


const commentValidator = [
    check('body')
      .exists({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage('Comment must be longer than 1 character')
  ];



  router.get("/questions/:id(\\d+)",asyncHandler(async(req, res) => {
    const comments = await Comment.findAll({
      where: {
        questionId: req.params.id
      }
    });
    return res.json(comments);
  })
);


// ROUTE FOR GETTING ALL COMMENTS----------------------------------------------------------------------------------------------------
router.get("/:id(\\d+)",asyncHandler(async (req, res) => {
    const comments = await Comment.findAll({
      include: User
    });
    return res.json(comments);
  })
);

// ROUTE FOR POSTING COMMENTS----------------------------------------------------------------------------------------------------
router.post("/new", commentValidator,requireAuth,asyncHandler(async (req, res) => {
      const { userId,body,questionId} = req.body
      const newComment = await Comment.create(
        req.body)
    return res.json(newComment)

  })
);
// ROUTE FOR EDITING COMMENTS----------------------------------------------------------------------------------------------------
router.put("/:id(\\d+)", commentValidator ,requireAuth, asyncHandler(async(req,res) => {
  const { body, commentId} = req.body
  const comment = await Comment.findOne({
    where:{
      id: commentId
    }
  })

  const updateComment = await comment.update({
    body
  })
  return res.json(updateComment)

}));
// ROUTE FOR DELETING COMMENTS----------------------------------------------------------------------------------------------------
router.delete("/:id(\\d+)", requireAuth, asyncHandler(async(req, res) => {
  const { commentId } = req.body
  const comment = await Comment.findOne({
    where: {
      id:commentId
    }
  })

  if(comment){
   await comment.destroy()
   const comments = await Comment.findAll({
    include: User
   })
   return res.json(comments)
  }
}));

module.exports = router;
