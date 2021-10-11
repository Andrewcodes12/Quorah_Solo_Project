const express = require("express")
const router = express.Router()
const asyncHandler = require("express-async-handler")
const {check} = require("express-validator")
const { Question,User,Comment,Like } = require("../../db/models")
const {requireAuth,csrfProtection} = require('../../utils/auth')
const {handleValidationErrors} = require("../../utils/validation")

const questionValidator = [
    check("body")
    .exists({checkFalsy: true})
    .notEmpty()
    .withMessage("Question cannot be empty, Please ask a question")
    .isLength(2000),
    handleValidationErrors,
]

// ROUTE FOR GETTING ALL QUESTIONS----------------------------------------------------------------------------------------------------
router.get('/', asyncHandler(async(req, res) => {
    const questions = await Question.findAll({
      include: User, Comment
    })
    return res.json(questions)
  }))

// ROUTE FOR GETTING NEW QUESTION FROM----------------------------------------------------------------------------------------------------
router.get('/new',requireAuth,csrfProtection, asyncHandler(async(req, res, next) => {
    const question = await Question.findAll();
    res.json(question)
}));

// ROUTE FOR CREATING A QUESTION ----------------------------------------------------------------------------------------------------
// router.post('/new', questionValidator,requireAuth,csrfProtection,asyncHandler(async (req,res) => {
//     const {userId,body} = req.body;
//     const newQuestion = await Question.build({
//     userId,
//     body
// })
//     return res.json(newQuestion)
// })
// )

router.post('/new',requireAuth, csrfProtection,questionValidator,asyncHandler(async(req, res, next) => {
  const {
    body
  } = req.body;

  const question = question.build({
    userId: req.session.auth.userId,
    body
  });

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    await question.save();
    res.redirect('/');
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

router.post('/edit/:id(\\d+)',requireAuth,csrfProtection,questionValidator,asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const questionToUpdate = await Question.findByPk(questionId);

    checkPermissions(questionToUpdate,res.locals.user)

    const {
      body
    } = req.body;

    const question = {
      body
    };

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await questionToUpdate.update(question);
      res.redirect('/');
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.json({
        question: { ...question, id:questionId },
        errors,
        like,
        comment
      });
    }
}));

// ROUTE FOR GET REQUEST TO DELETE A SPECIFIC QUESTION ----------------------------------------------------------------------------------------------------
router.delete('/delete/:id(\\d+)',requireAuth,asyncHandler(async (req, res) => {
      const { questionId } = req.body;

      const question = await Question.destroy({
        where: {
          id: questionId,
        },
      });
      return res.json(questionId);
    })
  );



module.exports = router;
