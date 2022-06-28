import '../styles/globals.css'
import Navbar from './posts/navbar.js'

function MyApp({ Component, pageProps }) {
  console.log(pageProps);
  console.log(Component);

  return (
    <>
      <Navbar></Navbar>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
