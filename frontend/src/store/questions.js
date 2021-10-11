const LOAD_QUESTIONS = "questions/LOAD_QUESTIONS";

const load = (questions) => ({
  type: LOAD_QUESTIONS,
  questions,
});


export const getQuestions = () => async (dispatch) => {
  const response = await fetch(`/api/`);

  if (response.ok) {
    const question = await response.json();
    dispatch(load(question));
  }
};


const initalState = {};

const questionReducer = (state = initalState, action) => {
    switch (action.type) {
    case LOAD_QUESTIONS: {
      const questions = {...state};
      action.question.forEach((question) => {
        questions[question.id] = question;
      });

      return questions

    }
    default:
      return state;
  }
};

export default questionReducer;
