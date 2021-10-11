import { csrfFetch } from './csrf';

const LOAD = 'QUESTIONS/LOAD';
const LOAD_TYPES = 'QUESTIONS/LOAD_TYPES';
const ADD_ONE = 'QUESTIONS/ADD_ONE';

const load = (list) => ({
  type: LOAD,
  list
});


const addOnequestions = (questions) => ({
  type: ADD_ONE,
  questions
});

export const createquestions = (questions) => async (dispatch) => {
  const {userId,body} = questions
  const response = await csrfFetch(`/api/questions`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId,
      body
    })
  });

  if (response.ok) {
    const questions = await response.json();
    dispatch(addOnequestions(questions));
    return questions;
  }
};

export const updatequestions = (questions) => async (dispatch) => {
  const {body,questionId} = questions
  const response = await csrfFetch(`/api/questions/${questionId}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      body,
      questionId
    })
  });

  if (response.ok) {
    const questions = await response.json();
    dispatch(addOnequestions(questions));
    return questions;
  }
};

export const getOnequestions = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/questions/${id}`);

  if (response.ok) {
    const questions = await response.json();
    dispatch(addOnequestions(questions));
  }
};

export const getquestions = () => async (dispatch) => {
  const response = await csrfFetch(`/api/questions`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};


const initialState = {
  list: [],
  types: []
};

const sortList = (list) => {
  return list
    .sort((questionsA, questionsB) => {
      return questionsA.no - questionsB.no;
    })
    .map((questions) => questions.id);
};

const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      const allquestions = {};
      action.list.forEach((questions) => {
        allquestions[questions.id] = questions;
      });
      return {
        ...allquestions,
        ...state,
        list: sortList(action.list)
      };
    }
    case LOAD_TYPES: {
      return {
        ...state,
        types: action.types
      };
    }
    case ADD_ONE: {
      if (!state[action.questions.id]) {
        const newState = {
          ...state,
          [action.questions.id]: action.questions
        };
        const questionsList = newState.list.map((id) => newState[id]);
        questionsList.push(action.questions);
        newState.list = sortList(questionsList);
        return newState;
      }
      return {
        ...state,
        [action.questions.id]: {
          ...state[action.questions.id],
          ...action.questions
        }
      };
    }
    default:
      return state;
  }
};

export default questionsReducer;
