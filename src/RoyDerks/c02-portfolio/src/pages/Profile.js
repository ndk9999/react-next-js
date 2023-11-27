import './Profile.css';
import { useEffect, useState } from "react";
import Link from '../components/Link';
import List from '../components/List';

function Profile({ username }) {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({});

    const items = [
        { 
            field: 'html_url', 
            value: <Link url={profile.html_url} title={profile.html_url} />
        },
        { 
            field: 'repos_url', 
            value: <Link url={profile.repos_url} title={profile.repos_url} />
        },
        { field: 'name', value: profile.name },
        { field: 'company', value: profile.company },
        { field: 'location', value: profile.location },
        { field: 'email', value: profile.email || 'unknown' },
        { field: 'bio', value: profile.bio || 'unknown' }
    ];

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`https://api.github.com/users/${username}`);
            const userProfile = await response.json();

            if (userProfile) {
                setProfile(userProfile);
                setLoading(false);
            }
        }

        fetchData();
    }, [username]);

    return (
        <div className='Profile-container'>
            <h2>About Me</h2>
            {
                loading ? (
                    <span>Loading ...</span>
                ) : (
                    <>
                        <img 
                            className='Profile-avatar'
                            src={profile.avatar_url}
                            alt={profile.name}
                        />
                        <List items={items} />
                    </>
                )
            }
        </div>
    );
}

export default Profile;