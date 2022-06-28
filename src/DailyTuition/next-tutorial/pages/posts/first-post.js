import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import nextjs from '../../public/images/nextjs.png'
import styles from '../../styles/sass/style.module.scss'
import Layout from '../layout/layout.js'

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export default function FirstPost() {
    const [post, setPost] = useState('');
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        // make some delay using sleep function
        sleep(3000).then(() => {
            setPost({
                title: 'New Post',
                description: 'Post data from remote service'
            });
            setLoading(false);
        });
    }, [])

    if (isLoading) {
        return <p>Loading ...</p>
    }

    if (!post) {
        return <p>No data available</p>
    }

    return (
        <Layout>
            <Head>
                <title>Next.js First Post</title>
            </Head>

            <h1>
                {post.title}
            </h1>
            <p>
                {post.description}
            </p>
        </Layout>
    )
}