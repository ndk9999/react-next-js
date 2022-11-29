import React, { useEffect, useState } from 'react';
import { getDataFromServer } from '../helpers/apiClient';
//import { useSelector } from 'react-redux';

const ScoreTable = () => {
    //const scoreTable = useSelector(state => state.scores.scoreTable);

    const [scoreTable, setScoreTable] = useState([]);

    useEffect(() => {
        getDataFromServer(`${process.env.REACT_APP_API_URL}/api/results`, (data) => {
            setScoreTable(data);
        });
    });

    return (
        <div>
            <table>
                <thead className='table-header'>
                    <tr className='table-row'>
                        <td>Name</td>
                        <td>Attemps</td>
                        <td>Earn Points</td>
                        <td>Result</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        scoreTable.map((s, i) => (
                            <tr className='table-body' key={i}>
                                <td>{s.userId}</td>
                                <td>{s.attempts}</td>
                                <td>{s.earnedPoints}</td>
                                <td>{s.finalResult}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ScoreTable;