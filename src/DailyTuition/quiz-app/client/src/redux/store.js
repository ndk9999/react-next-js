import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Import reducers
import questionReducer from "./questionReducer";
import resultReducer from "./resultReducer";
import scoreReducer from "./scoreReducer";

const rootReducer = combineReducers({
    questions: questionReducer,
    results: resultReducer,
    scores: scoreReducer
});

// Create store with reducer
export default configureStore({reducer: rootReducer});