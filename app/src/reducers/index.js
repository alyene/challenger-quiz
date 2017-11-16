import { combineReducers } from 'redux';
import QuestionReducer from './question';


//reducer gives application state
export default combineReducers ({
  questions: QuestionReducer
});
