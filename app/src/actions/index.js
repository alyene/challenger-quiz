import { QUESTION_INDEX, STORE_QUESTIONS, SUBMIT_SCORE } from './types';

export const store_questions = (data) => {
  return {
    type: STORE_QUESTIONS,
    payload: data
  };
};

export const question_index = (index) => {
  return {
    type: QUESTION_INDEX,
    payload: index
  };
};

export const submit_score = (score) => {
  return {
    type: SUBMIT_SCORE,
    payload: score
  }
}
