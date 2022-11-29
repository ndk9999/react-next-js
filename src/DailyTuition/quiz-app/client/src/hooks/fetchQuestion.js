import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDataFromServer } from "../helpers/apiClient";

/* import redux actions */
import * as Action from '../redux/questionReducer';

// Fetch question hook to fetch api data and set value to store
export const useFetchQuestion = () => {
    const dispatch = useDispatch();
    
    const [ dataContext, setDataContext ] = useState({
        isLoading: false,
        apiData: [],
        serverError: null
    });

    useEffect(() => {
        setDataContext(prev => ({...prev, isLoading: true}));
        
        // Use async function to fetch backend data
        (async () => {
            try {
                const [{questions, answers}] = await getDataFromServer(`${process.env.REACT_APP_API_URL}/api/questions`, (data) => data);

                if (questions.length > 0) {
                    setDataContext(prev => ({...prev, isLoading: false}));
                    setDataContext(prev => ({...prev, apiData: {questions, answers}}));

                    // Dispatch an action
                    dispatch(Action.startExamAction({questions, answers}));
                } else {
                    throw new Error("No questions available");
                }
            } catch (error) {
                setDataContext(prev => ({...prev, isLoading: false}));
                setDataContext(prev => ({...prev, serverError: error}));
            }
        })();
    }, [dispatch]);

    return [dataContext, setDataContext];
};

/* Move to next question */
export const moveToNextQuestion = () => async (dispatch) => {
    try {
        // Increase trace by 1
        dispatch(Action.moveNextAction());
    } catch (error) {
        console.log(error);
    }
};

/* Move to previous question */
export const moveToPrevQuestion = () => async (dispatch) => {
    try {
        // Decrease trace by 1
        dispatch(Action.movePrevAction());
    } catch (error) {
        console.log(error);
    }
};