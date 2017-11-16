import { QUESTION_INDEX, STORE_QUESTIONS } from '../actions/types';

const INITIAL_STATE =  { question: '', questionIndex: 0};

export default (state =  INITIAL_STATE, action) => {
  switch (action.type) {
    case STORE_QUESTIONS:
      return { ...state, question: action.payload};
    case QUESTION_INDEX:
      return { ...state, questionIndex: action.payload}
    default:
      return state;
  }
};
