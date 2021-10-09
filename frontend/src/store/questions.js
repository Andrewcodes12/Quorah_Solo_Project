
const LOAD = "questions/LOAD";

const load = (list) => ({
  type: LOAD,
  list,
});


export const getQuestions = () => async (dispatch) => {
  const response = await fetch(`/api/`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};


const initalState = {};

const questionReducer = (state = initalState, action) => {
    switch (action.type) {
    case LOAD: {
      const questions = {...state};
      action.list.forEach((question) => {
        questions[question.id] = question;
      });

      return questions

    }
    default:
      return state;
  }
};

export default questionReducer;
