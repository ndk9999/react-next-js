import Head from 'next/head'
import Image from 'next/image'
import nextjs from '../../public/images/nextjs.png'
import styles from '../../styles/sass/style.module.scss'

export default function FirstPost() {
    return (
        <>
            <Head>
                <title>Next.js First Post</title>
            </Head>

            <h1 className={styles.title}>First Blog Post</h1>
            <h2 className='title'>Post Title</h2>
            <style jsx>
            {
                `
                .title {
                    font-size: 60px;
                    color: red;
                }
                `
            }
            </style>

            <Image 
                src='/images/nextjs.png'
                width={300}
                height={300}
            />
        </>
    )
}