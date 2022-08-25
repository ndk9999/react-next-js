import styles from './layout.module.css'
import Head from 'next/head'
import {navLinks} from '../lib/nav-links'
import Link from 'next/link'

export default function Layout({children, home}) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Home</title>
            </Head>

            <header>
                {home ? (
                    homeNavigation()
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

function homeNavigation() {
    return (
        <nav>
            <ul>
            {
                navLinks.map((link, idx) => {
                    return (
                        <li key={link.name}>
                            <Link href={ {pathname: link.path, query: {id: "1"}}}>
                                {link.name}
                            </Link>
                        </li>
                    )
                })
            }
            </ul>
        </nav>
    )
}