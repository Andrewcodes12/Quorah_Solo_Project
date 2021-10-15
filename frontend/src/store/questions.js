import { csrfFetch } from "./csrf";

const LOAD = "QUESTIONS/LOAD";
const ADD = "QUESTIONS/ADD";
const REMOVE = "QUESTIONS/REMOVE";


const load = (list) => ({
  type: LOAD,
  list,
});


const createQuestion = (question) => ({
  type: ADD,
  question,
});

const remove = (questionId) => ({
  type: REMOVE,
  questionId,
});


export const getquestions = () => async (dispatch) => {
  const response = await fetch(`/api/questions`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};

export const createquestions = (questionDetails) => async (dispatch) => {
   const { userId, body} = questionDetails
  const response = await csrfFetch("/api/questions/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      body
    }),
  });
    const newQuestion = await response.json();
    dispatch(createQuestion(newQuestion));
    return newQuestion;

};


export const updatequestions = (questionDetails) => async dispatch => {
  const { body, questionId } = questionDetails
  const response = await csrfFetch(`/api/questions/${questionId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({
      body,
      questionId
    })
  })
  if(response.ok){
    const updatedQuestion = await response.json()
    dispatch(createQuestion(updatedQuestion))
    return updatedQuestion
  }
}


export const removeQuestion = (questionId) => async dispatch => {
  const response = await csrfFetch(`/api/questions/${questionId}`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({
      questionId
    })
  })

  if(response.ok){
    const removedQuestionId = await response.json()
    dispatch(remove(removedQuestionId))
    return removedQuestionId
  }
}

const initalState = {};

const questionReducer = (state = initalState, action) => {
  switch (action.type) {
    case LOAD: {
      const allQuestions = {};
      action.list.forEach((question) => {
        allQuestions[question.id] = question;
      });

      return {
        ...allQuestions,
        ...state,
      };
    }
    case ADD: {
        let newState = {...state, [action.question.id]: action.question}
        return newState
    }
    case REMOVE: {
      const deleteState = {  ...state }
      delete deleteState[action.questionId]
      return deleteState
    }
    default:
      return state;
  }
};

export default questionReducer;
