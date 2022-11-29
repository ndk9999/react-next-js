import { createSlice } from "@reduxjs/toolkit";

export const scoreReducer = createSlice({
    name: 'score',
    initialState: {
        scoreTable: []
    },
    reducers: {
        saveScoreAction: (state, action) => {
            state.scoreTable.push(action.payload);
        }
    }
});

export const { saveScoreAction } = scoreReducer.actions;

export default scoreReducer.reducer;