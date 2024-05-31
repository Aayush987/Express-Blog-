import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <main>
        <Header />
        <Outlet />
        <hr className='divider' />
        <footer>
            <p>© 2024 ExpressBlog</p>
            <p>Made with 💖 by Aayush Sharma</p>
        </footer>
    </main>
  )
}

export default Layout