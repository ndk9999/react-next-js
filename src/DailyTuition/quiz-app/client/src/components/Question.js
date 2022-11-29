import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/* Import custom hooks */
import { useFetchQuestion } from "../hooks/fetchQuestion";
import { updateUserAnswer } from "../hooks/saveAnswer";

const Question = ({onAnswerSelected}) => {
    const [answer, setAnswer] = useState(undefined);
    const [{isLoading, apiData, serverError}, setDataContext] = useFetchQuestion();

    const question = useSelector(state => state.questions.queue[state.questions.trace]);
    const trace = useSelector(state => state.questions.trace);
    const userAnswers = useSelector(state => state.results.userAnswers);
    const dispatch = useDispatch();

    // Hooks
    useEffect(() => {
        // console.log({trace, answer});
        dispatch(updateUserAnswer({trace, answer}));
    }, [answer]);

    // Event handlers
    function onOptionSelected(optIdx) {
        onAnswerSelected(optIdx);
        setAnswer(optIdx);
        dispatch(updateUserAnswer({trace, answer}));
        // console.log(`Radio button ${optIdx} change`)
    }

    // Prepare for rendering
    if (isLoading) return <h3 className='text-light'>Loading ...</h3>;
    if (serverError) return <h3 className='text-light'>{serverError || 'Unknown Error'}</h3>

    return (
        <div className='questions'>
            <h2 className='text-light'>
                { question?.question }
            </h2>

            <ul key={question?.id}>
                {
                    question?.options.map((opt, idx) => (
                        <li key={idx}>
                            <input
                                type='radio'
                                value={false}
                                name='options'
                                id={`option-${idx}`}
                                onChange={() => onOptionSelected(idx)}
                            />
                            
                            <label htmlFor={`option-${idx}`} className='text-primary'>
                                { opt }
                            </label>

                            <div className={`check ${userAnswers[trace] === idx ? 'checked' : ''}`}></div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Question;