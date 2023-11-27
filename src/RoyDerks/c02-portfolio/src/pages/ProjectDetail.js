import './Projects.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import List from '../components/List';
import Link from '../components/Link';

function ProjectDetail({username}) {
    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState({});
    const { name } = useParams();
    const dateFormatOptions = {
        dateStyle: 'short', timeStyle: 'short'
    };
    const dateFormatter = new Intl.DateTimeFormat('en-US', dateFormatOptions);

    const items = [
        {
            field: 'Project Name',
            value: `${project.name} (${project.full_name})`
        },
        {
            field: 'Github URL',
            value: <Link url={project.html_url} title={project.html_url} />
        },
        {
            field: 'Description',
            value: project.description
        },
        {
            field: 'Created At',
            value: project.created_at && dateFormatter.format(Date.parse(project.created_at))
        },
        {
            field: 'Last Modified',
            value: project.updated_at && dateFormatter.format(Date.parse(project.updated_at))
        },
        {
            field: 'Language',
            value: project.language
        },
        {
            field: 'License',
            value: project.license && project.license.name
        },
        {
            field: 'Open Issues',
            value: project.open_issues
        },
        {
            field: 'Watchers',
            value: project.watchers_count
        }
    ];

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`https://api.github.com/repos/${username}/${name}`);
            const result = await response.json();

            if (result) {
                setProject(result);
                setLoading(false);
            }
        }

        if (username && name) {
            fetchData();
        }
    }, [username, name]);

    return (
        <div className="Project-container">
            <h2>Project: {project.name}</h2>
            {
                loading ? (
                    <span>Loading ...</span>
                ) : (
                    <>
                        <List items={items} />
                    </>
                )
            }
        </div>
    );
}

export default ProjectDetail;