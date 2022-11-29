import * as Action from '../redux/resultReducer';

export const saveUserAnswer = (optIdx) => async (dispatch) => {
    try {
        await dispatch(Action.saveAnswerAction(optIdx));
    } catch (error) {
        console.log(error);
    }
};

export const updateUserAnswer = (userAnswer) => async (dispatch) => {
    try {
        dispatch(Action.updateAnswerAction(userAnswer));
    } catch (error) {
        console.log(error);
    }
};