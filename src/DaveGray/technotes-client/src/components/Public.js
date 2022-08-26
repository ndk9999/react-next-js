import { Link } from 'react-router-dom';

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Kids Coding!</span></h1>
            </header>
            <main className="public__main">
                <p>
                    Located in Beautiful Downtown DaLat City, Kids Coding provides a trained staff ready to meet your tech repair needs.
                </p>
                <address className="public__addr">
                    Kids Coding<br />
                    72 Kim Dong<br />
                    Ward 6, Da Lat City, Lam Dong<br />
                    <a href="tel:+84984159332">0984.159.332</a>
                </address>
                <br/>
                <p>
                    Owner: Phuc Nguyen
                </p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>
    )

    return content;
}

export default Public;