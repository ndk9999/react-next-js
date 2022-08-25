import {getAllPosts} from '../lib/helper.js'
import {useRouter} from 'next/router'

export default function Post({posts}) {
    const router = useRouter();
    const {id} = router.query;

    console.log(id);

    return (
        <article>
            <button onClick={() => router.push('/posts/users')}>
                Post
            </button>

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