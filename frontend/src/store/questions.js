import { csrfFetch } from "./csrf";

const LOAD = "questions/LOAD";
const ADD = "questions/ADD";
const REMOVE = "questions/REMOVE";
const FILTER = "questions/FILTER"

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

const loadFiltered = (filteredList) => ({
  type: FILTER,
  filteredList
})

export const filteredQuestions = (questions) => async dispatch => {
  console.log(questions)
  dispatch(loadFiltered(questions))

}


export const editQuestion = (questionDetails) => async dispatch => {
  const { userId,body, questionId } = questionDetails
  const response = await csrfFetch(`/api/questions/${questionId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({
      userId,
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

export const getQuestions = () => async (dispatch) => {
  const response = await fetch(`/api/`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};

export const createNewQuestion = (questionDetails) => async (dispatch) => {
   const { userId, body} = questionDetails
  const response = await csrfFetch("/api/questions/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        userId,
        body,
  }),
});
    const newQuestion = await response.json();
    dispatch(createQuestion(newQuestion));
    return newQuestion;
};

const initalState = { };

const questionReducer = (state = initalState, action) => {
    switch (action.type) {
    case LOAD: {
      const questions = {};
      action.list.forEach((question) => {
        questions[question.id] = question;
      });

      return {
        ...questions,
        ...state,
        list: action.list,
      };
    }
    case FILTER: {
      let filteredState = { ...state }
      if(filteredState.filteredList){
        filteredState.filteredList = [...action.filteredList]
        return filteredState
      }else{
        const filteredQuestions = [...action.filteredList]
        const updatedFilteredState = { ...state, filteredList: filteredQuestions}
        return updatedFilteredState
      }
      }
    case ADD: {
      if(!state[action.question.id]){
        let newState = {...state, [action.question.id]: action.question}
        newState.list.push(action.question)
        return newState
    } else {
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
