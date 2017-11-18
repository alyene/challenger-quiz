import { combineReducers } from 'redux';
import QuestionReducer from './question';
import AnswerReducer from './answer';

//reducer gives application state
export default combineReducers ({
  questions: QuestionReducer,
  answer: AnswerReducer
});
