import './Projects.css';
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import List from "../components/List";

function Projects({username}) {
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`https://api.github.com/users/${username}/repos`);
            const result = await response.json();

            if (result) {
                setProjects(result);
                setLoading(false);
            }
        }

        fetchData();
    }, [username]);

    return (
        <div className="Project-container">
            <h2>Projects</h2>
            {
                loading ? (
                    <span>Loading ...</span>
                ) : (
                    <>
                        <List items={projects.map((p) => ({
                            field: p.name,
                            value: (
                                <RouterLink to={`/projects/${p.name}`}>
                                    Open Project
                                </RouterLink>
                            )
                        }))} />
                    </>
                )
            }
        </div>        
    );
}

export default Projects;