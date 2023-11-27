import Task from '../../components/Task/Task';
import useDataFetching from '../../hooks/useDataFetching';
import './Backlog.css';

function Backlog() {
    const [loading, error, tasks] = useDataFetching('https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/tasks');

    return (
        <div className='Backlog-wrapper'>
            <h2>Backlog</h2>

            <div className='Tasks-wrapper'>
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
                            />
                        ))
                    )
                }
            </div>
        </div>
    );
}

export default Backlog;