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
        list: action.list,
      };
    }
    case ADD: {
      if(!state[action.question.id]){
        let newState = {...state, [action.question.id]: action.question}
        newState.list.push(action.question)
        return newState
      }else{
        let updatedState = { ...state }
        updatedState[action.question.id] = action.question
        const newQuestionList = [...updatedState.list]
        const removeQuestion = newQuestionList.filter(question => question.id === action.question.id)[0]
        newQuestionList.splice(newQuestionList.findIndex(question => question.id === removeQuestion.id), 1, action.question)
        updatedState.list = newQuestionList
        return updatedState
      }
    }
    case REMOVE: {
      const deleteState = {  ...state }
      const newQuestionsList = [...deleteState.list]
      const removeQuestion = newQuestionsList.filter(question => question.id === action.questionId)
      removeQuestion.forEach(question => newQuestionsList.splice(newQuestionsList.findIndex(question2 => question2.id === question.id), 1))
      delete deleteState[action.questionId]
      deleteState.list = newQuestionsList
      return deleteState
    }
    default:
      return state;
  }
};

export default questionReducer;
