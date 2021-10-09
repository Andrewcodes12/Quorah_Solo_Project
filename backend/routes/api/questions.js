const express = require("express")
const router = express.Router()
const asyncHandler = require("express-async-handler")
const {check} = require("express-validator")
const { Question } = require("../../db/models")
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



// ROUTE FOR DELETING A QUESTION ----------------------------------------------------------------------------------------------------
