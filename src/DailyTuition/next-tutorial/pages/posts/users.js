import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function Users({users}) {
    const {data, error} = useSWR('http://localhost:3000/api/users', fetcher);

    if (error) return (
        <div>
            Error fetching data
        </div>
    )

    if (!data) return (
        <div>Loading ...</div>
    )

    return (
        <article>
            {
                users.map(u => (
                    <div key={u.id}>
                        <h1>{u.name}</h1>
                    </div>
                ))
            }
        </article>
    )
}

export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/users');
    const users = await res.json();

    return {
        props: {
            users
        }
    }
}