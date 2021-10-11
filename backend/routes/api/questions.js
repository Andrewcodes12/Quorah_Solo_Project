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
router.post('/new', questionValidator,requireAuth,csrfProtection,asyncHandler(async (req,res) => {
    const {userId,body} = req.body;
    const newQuestion = await Question.build({
    userId,
    body
})
    return res.json(newQuestion)
})
)

// ROUTE FOR EDITING A QUESTION ----------------------------------------------------------------------------------------------------
router.put("/:id(\\d+)",questionValidator,requireAuth,csrfProtection,asyncHandler(async (req, res) => {
    const { questionId, body } = req.body;
    const question = await Question.findOne({
    where: {
    id: questionId,
},
});
    const updatedQuestion = await question.update({
    body
});

    return res.json(updatedQuestion);
})
);


// ROUTE FOR DELETING A QUESTION ----------------------------------------------------------------------------------------------------
router.delete( "/:id(\\d+)", requireAuth,csrfProtection,asyncHandler(async (req, res) => {
    const { questionId } = req.body;
    const question = await Question.destroy({
    where: {
    id: questionId,
    },
});
    return res.json(question);
})
);






module.exports = router;
