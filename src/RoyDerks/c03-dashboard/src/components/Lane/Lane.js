import Task from '../Task/Task';
import './Lane.css';

function Lane({ laneId, title, loading, error, tasks, onDragStart, onDragOver, onTaskDrop }) {
    return (
        <div 
            className={`Lane-wrapper lane-${laneId}`}
            onDragOver={onDragOver}
            onDrop={(e) => onTaskDrop(e, laneId)}
        >
           <h2>{title}</h2> 
           {
                loading || error ? (
                    <span>{error || 'Loading ...'}</span>
                ) : (
                    tasks.map((t) => (
                        <Task 
                            key={t.id}
                            id={t.id}
                            title={t.title} 
                            body={t.body}
                            onDragStart={onDragStart}
                        />
                    ))
                )
           }
        </div>
    );
}

export default Lane;