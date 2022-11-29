import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { attemptsNumber, earnedPointsNumber, getFinalResult } from '../helpers/scoreHelper';
import { resetAllAction } from '../redux/questionReducer';
import { resetAnswersAction } from '../redux/resultReducer';
import { usePublishResult } from "../hooks/saveScore";
import '../styles/Result.css';
import ScoreTable from './ScoreTable';

const Result = () => {

    const dispatch = useDispatch();
    const { questions: {queue, answers}, results: {userAnswers, userId}} 
        = useSelector(state => state);

    const totalPoints = queue.length * 10;
    const attempts = attemptsNumber(userAnswers);
    const earnedPoints = earnedPointsNumber(answers, userAnswers, 10);
    const finalResult = getFinalResult(totalPoints, earnedPoints);

    // useEffect(() => {
    //     // console.log(userAnswers);
    //     console.log(earnedPoints);
    //     dispatch(saveQuizScore({userId, attempts, earnedPoints, finalResult}));
    // }, [userId, attempts, earnedPoints, finalResult]);

    usePublishResult({
        userId,
        userAnswers,
        attempts,
        earnedPoints,
        finalResult: finalResult ? 'Passed' : 'Failed'
    });

    // Event handlers
    function onRestartClicked() {
        console.log('Button Restart is clicked');
        dispatch(resetAllAction());
        dispatch(resetAnswersAction());
    }

    return (
        <div className='container'>
            <h1 className='title text-light'>
                Quiz Application
            </h1>

            <div className='result flex-center'>
                <div className='flex'>
                    <span>Username:</span>
                    <span className='bold'>{userId || 'Unknown'}</span>
                </div>

                <div className='flex'>
                    <span>Total Quiz Points:</span>
                    <span className='bold'>{totalPoints || 0}</span>
                </div>

                <div className='flex'>
                    <span>Total Questions:</span>
                    <span className='bold'>{queue.length || 0}</span>
                </div>

                <div className='flex'>
                    <span>Total Attempts:</span>
                    <span className='bold'>{attempts || 0}</span>
                </div>

                <div className='flex'>
                    <span>Total Earn Points:</span>
                    <span className='bold'>{earnedPoints || 0}</span>
                </div>

                <div className='flex'>
                    <span>Quiz Result:</span>
                    <span className='bold' 
                          style={{color: `${finalResult ? "#2aff95" : "#ff2a66"}`}}>
                        { finalResult ? "Passed" : "Failed" }
                    </span>
                </div>
            </div>

            <div className='start'>
                <Link
                    className='btn'
                    to={'/'}
                    onClick={onRestartClicked}
                >
                    Restart
                </Link>
            </div>

            {/* Display result table */}
            <div className='container'>
                <ScoreTable />
            </div>
        </div>
    )
}

export default Result;