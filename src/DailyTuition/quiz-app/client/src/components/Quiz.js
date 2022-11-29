import React, { useEffect, useState } from 'react';
import Question from './Question';
import { useDispatch, useSelector } from "react-redux";
import { moveToNextQuestion, moveToPrevQuestion } from '../hooks/fetchQuestion';
import { saveUserAnswer } from '../hooks/saveAnswer';
import { Navigate } from "react-router-dom";

const Quiz = () => {
    const dispatch = useDispatch();
    //const examContext = useSelector(state => state);
    const userAnswers = useSelector(state => state.results.userAnswers);
    const { queue, trace } = useSelector(state => state.questions);
    const [answer, setAnswer] = useState(undefined);

    useEffect(() => {
        // console.log(examContext);
    });

    // Event handlers
    function onPrev() {
        // console.log('Button Prev is clicked');

        if (trace > 0) {
            // Update the trace value by one using the function movePrevAction
            dispatch(moveToPrevQuestion());
        }
    }

    function onNext() {
        // console.log('Button Next is clicked');

        if (trace < queue.length) {
            // Update the trace value by one using the function moveNextAction
            dispatch(moveToNextQuestion());

            if (userAnswers.length <= trace) {
                // Push user answer to the answers array
                dispatch(saveUserAnswer(answer));
            }
        }

        // Reset the value of the answer variable
        setAnswer(undefined);
    }

    function onAnswerSelected(optIdx) {
        console.log(optIdx)
        setAnswer(optIdx);
    }

    // Redirect user to Result screen if user finished exam
    if (userAnswers.length && userAnswers.length >= queue.length) {
        return <Navigate to={'/result'} replace='true'></Navigate>
    }

    return (
        <div className='container'>
            <h1 className='title text-light'>
                Quiz Application
            </h1>

            {/* Display questions */}
            <Question onAnswerSelected={onAnswerSelected} />

            {/* Navigation buttons */}
            <div className='grid'>
                {
                    trace > 0 
                    ? (
                        <button className='btn prev' onClick={onPrev}>
                            Prev
                        </button>
                    ) 
                    : <div></div>
                }

                <button className='btn next' onClick={onNext}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default Quiz;