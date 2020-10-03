import { saveQuestion, saveQuestionAnswer } from '../utils/api';
import { addUserQuestion, addUserQuestionAnswer } from './users';
import { addQuestion, addQuestionAnswer} from './questions';
import { showLoading, hideLoading } from 'react-redux-loading';

export function handleAddQuestionAnswer (questionId, selectedOption) {
  return (dispatch, getState) => {
    dispatch(showLoading());

    const {login} = getState();
    const authedUser = login.loggedInUser.id;

    saveQuestionAnswer({
      authedUser,
      qid: questionId,
      answer: selectedOption
    }).then(() => {
      dispatch(addQuestionAnswer(authedUser, questionId, selectedOption));
      dispatch(addUserQuestionAnswer(authedUser, questionId, selectedOption));
      dispatch(hideLoading());
    });
  }
}

export function handleAddQuestion (optionOneText, optionTwoText, callback) {
  return (dispatch, getState) => {
    dispatch(showLoading());

    const {login} = getState();
    const author = login.loggedInUser.id;

    saveQuestion({
      optionOneText,
      optionTwoText,
      author
    }).then((question) => {
      dispatch(addUserQuestion(question));
      dispatch(addQuestion(question));
      dispatch(showLoading());
    }).then(callback);
  }
}
