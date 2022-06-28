import styles from './layout.module.css'
import Head from 'next/head'

export default function Layout({children, home}) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Home</title>
            </Head>

            <header>
                {home ? (
                    <div>Home Page Header</div>
                ) : (
                    <div>Other Page Header</div>
                )}
            </header>

            <main>
                {children}
            </main>

            <footer>
                Footer
            </footer>
        </div>
    )
}