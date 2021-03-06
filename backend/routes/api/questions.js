const express = require("express")
const router = express.Router()
const asyncHandler = require("express-async-handler")
const {check,validationResult} = require("express-validator")
const { Question,User,Comment,Like } = require("../../db/models")
const {requireAuth,csrfProtection} = require('../../utils/auth')
const {handleValidationErrors} = require("../../utils/validation")


const questionValidator = [
    check("body")
    .exists({checkFalsy: true})
    .notEmpty()
    .withMessage("Question cannot be empty, Please ask a question")
    .isLength({max:2000}),
    handleValidationErrors,
]

const commentValidator = [
    check('body')
      .exists({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage('Comment must be longer than 1 character')
  ];

// ROUTE FOR GETTING ALL QUESTIONS----------------------------------------------------------------------------------------------------
router.get('/', asyncHandler(async(req, res) => {
    const questions = await Question.findAll({
      include: [{model:User}, {model:Comment}, {model:Like}]
    })
    return res.json(questions)
  }))

// ROUTE FOR GETTING NEW QUESTION FROM----------------------------------------------------------------------------------------------------
router.get('/new',requireAuth,csrfProtection, asyncHandler(async(req, res, next) => {
    const question = await Question.findAll();
    res.json(question)
}));

// ROUTE FOR CREATING A QUESTION ----------------------------------------------------------------------------------------------------
router.post('/new',requireAuth, csrfProtection,questionValidator,asyncHandler(async(req, res, next) => {
  const {
    body
  } = req.body;

  const question = Question.build({
    userId: req.user.id,
    body
  });

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    await question.save();
    res.json(question);
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.json({
      question,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}));

// ROUTE FOR GETTING A QUESTION AT A SPECIFIC QUESTION ID ----------------------------------------------------------------------------------------------------
router.get('/:id(\\d+)',csrfProtection,asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const question = await Question.findByPk(questionId,{
      include: [User,Comment,Like]
    });
    const comments = await Comment.findAll({
      where: {
        questionId: questionId
      },
      order: [["createdAt", "DESC"]],
      include: User
    });
    let likesCount = await Like.count({
      where: {
        questionId: questionId
      }
    })

    res.json({
      question,
      comments,
      likesCount,
      csrfToken: req.csrfToken(),
    })
  }));

// ROUTE FOR GETTING AN EDIT FORM FOR A SPECIFIC QUESTION ----------------------------------------------------------------------------------------------------
router.get('/edit/:id(\\d+)',requireAuth,csrfProtection,asyncHandler(async (req, res) => {
  const questionId = parseInt(req.params.id, 10);
  const question = await Question.findByPk(questionId);

  checkPermissions(question,res.locals.user)

  res.json({
    question,
    csrfToken: req.csrfToken(),
  });
}));

// ROUTE FOR EDITING A SPECIFIC QUESTION ----------------------------------------------------------------------------------------------------
router.put("/:id(\\d+)",questionValidator,requireAuth,asyncHandler(async (req, res) => {
    const {questionId, body } = req.body;
    const question = await Question.findOne({
      where: {
        id: questionId,
      },
    });
    const updatedQuestion = await question.update({
      body,
    });
    return res.json(updatedQuestion);
  })
);

// ROUTE FOR REQUEST TO DELETE A SPECIFIC QUESTION ----------------------------------------------------------------------------------------------------
router.delete('/:id(\\d+)',requireAuth,asyncHandler(async (req, res) => {
  const questionId = parseInt(req.params.id, 10);
  const question = await Question.findByPk(questionId);

  await question.destroy();
  return res.json(questionId);
})
);




  // ROUTE FOR POSTING A COMMENT TO A SPECIFIC QUESTION ----------------------------------------------------------------------------------------------------
  router.post('/:id(\\d+)/comments',requireAuth,csrfProtection,commentValidator,asyncHandler(async (req, res) => {
    const { body } = req.body;
    const theQuestionId = parseInt(req.params.id, 10);
    const comment = await Comment.build({ body, userId:req.user.id, questionId: theQuestionId })
    const validationErrors = validationResult(req);

    const user = await User.findByPk(req.user.id);
    const { userName, id: userId } = user;

    if (validationErrors.isEmpty()) {
      await comment.save();
      const { id, updatedAt } = comment;
      return res.status(201).json({
        id,
        userId,
        body,
        userName,
        updatedAt: updatedAt.toDateString()
      })
    } else {
      const errors = validationErrors.array().map((error) => error.msg);
      return res.status(406).json({
        emptyComment: true
      });
    }
}));



module.exports = router;
