import { postDataToServer } from "../helpers/apiClient";
import { saveScoreAction } from "../redux/scoreReducer";

export const saveQuizScore = (score) => async (dispatch) => {
    try {
        dispatch(saveScoreAction(score));
    } catch (error) {
        console.log(error);
    }
};

export const usePublishResult = (userResult) => {
    const {userId, userAnswers} = userResult;

    (async () => {
        try {
            if (userAnswers !== [] && !userId) {
                throw new Error("Couldn't get user result.");
            }

            const feedback = await postDataToServer(`${process.env.REACT_APP_API_URL}/api/results`, userResult, (data) => data);
            console.log(feedback);
        } catch (error) {
            console.log(error);
        }            
    })();
};