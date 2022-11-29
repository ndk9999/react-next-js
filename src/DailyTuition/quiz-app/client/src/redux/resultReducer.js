import { createSlice } from "@reduxjs/toolkit";

export const resultReducer = createSlice({
    name: 'result',
    initialState: {
        userId: null,
        userAnswers: []
    },
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        saveAnswerAction: (state, action) => {
            state.userAnswers.push(action.payload);
        },
        updateAnswerAction: (state, action) => {
            const { trace, answer } = action.payload;
            state.userAnswers.fill(answer, trace, trace + 1);
        },
        resetAnswersAction: () => {
            return {
                userId: null,
                userAnswers: []
            }
        }
    }
});

export const { 
    setUserId,
    saveAnswerAction,
    updateAnswerAction,
    resetAnswersAction
} = resultReducer.actions;

export default resultReducer.reducer;