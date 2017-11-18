import { SUBMIT_SCORE } from '../actions/types';

const INITIAL_STATE =  { score: ''};

export default (state =  INITIAL_STATE, action) => {
  switch (action.type) {
    case SUBMIT_SCORE:
      return { ...state, score: action.payload};
    default:
      return state;
  }
};
