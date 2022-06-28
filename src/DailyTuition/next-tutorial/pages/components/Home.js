import Layout from '../layout/layout.js'

export default function Home({post}) {
    return (
        <Layout>
            <h1>
                {post.title}
            </h1>
            <p>
                {post.description}
            </p>
        </Layout>
    )
}

export async function getStaticProps() {
    // Get external data from the file system, API, DB, etc.
    const data = {
        title: "Daily Tuition Post",
        description: "Post data from static props"
    };

    // The value of the 'props' key will be passed to the 'Home' component
    return {
        props: {
            post: data
        }
    }
}