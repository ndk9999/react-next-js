import {getAllPosts} from '../lib/helper.js'

export default function Post({posts}) {
    return (
        <article>
            {
                posts.map(p => (
                    <div key={p.id}>
                        <h1>{p.id}</h1>
                        <h1>{p.title}</h1>
                        <p>{p.description}</p>
                    </div>
                ))
            }
        </article>
    )
}

export async function getStaticProps({params}) {
    const {id} = params;
    const posts = getAllPosts(id);

    return {
        props: {
            posts
        }
    }
}

export async function getStaticPaths() {
    const posts = getAllPosts();
    const paths = posts.map(p => ({
        params: {
            id: p.id.toString()
        }
    }));    

    return {
        paths,
        fallback: false
    }
}