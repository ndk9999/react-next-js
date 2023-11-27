import './Board.css';
import { useEffect, useState } from 'react';
import Lane from '../../components/Lane/Lane';
import useDataFetching from '../../hooks/useDataFetching';

const lanes = [
    { id: 1, title: 'To Do' },
    { id: 2, title: 'In Progress' },
    { id: 3, title: 'Review' },
    { id: 4, title: 'Done' }
];

function Board() {
    // const [loading, setLoading] = useState(true);
    // const [tasks, setTasks] = useState([]);
    // const [error, setError] = useState('');

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const response = await fetch('https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/tasks');
    //             const result = await response.json();

    //             if (result) {
    //                 setTasks(result);
    //                 setLoading(false);
    //             }
    //         } catch (err) {
    //             setLoading(false);
    //             setError(err.message);
    //         }
    //     }

    //     fetchData();
    // }, []);

    const [loading, error, apiData] = useDataFetching('https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/tasks');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        setTasks(apiData);
    }, [apiData]);

    function onDragStart(e, id) {
        e.dataTransfer.setData('id', id);
    }

    function onDragOver(e) {
        e.preventDefault();
    }

    function onTaskDrop(e, laneId) {
        const id = e.dataTransfer.getData('id');
        const updatedTasks = tasks.filter((t) => {
            if (t.id.toString() === id) {
                t.lane = laneId;
            }
            return t;
        })
        setTasks(updatedTasks);
    }

    return (
        <div className='Board-wrapper'>
            {
                lanes.map((item) => (
                    <Lane 
                        key={item.id} 
                        laneId={item.id}
                        title={item.title} 
                        loading={loading}
                        error={error}
                        tasks={tasks.filter((t) => t.lane === item.id)}
                        onDragStart={onDragStart}
                        onDragOver={onDragOver}
                        onTaskDrop={onTaskDrop}
                    />
                ))
            }
        </div>
    );
}

export default Board;