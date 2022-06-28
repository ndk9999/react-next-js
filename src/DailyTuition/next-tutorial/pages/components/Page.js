import Layout from "../layout/layout.js";

export default function Page(props) {
    return (
        <Layout>
            <h1>
                {props.title}
            </h1>
            <p>
                {props.description}
            </p>
        </Layout>
    )
}

export async function getServerSideProps() {
    const data = {
        title: 'New Post',
        description: 'Post data from server side rendering props'
    };

    return {
        props: data
    }
}