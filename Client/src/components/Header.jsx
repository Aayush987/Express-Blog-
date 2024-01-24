import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { UserContext} from '../UserContext'


const Header = () => {
    const {setUserinfo, userinfo} = useContext(UserContext);
 
   useEffect(() => {
      fetch('https://blog-application-backend-a9xe.onrender.com/profile', {
        credentials: 'include'      
      }).then(res => {
        res.json().then(userinfo => {
          setUserinfo(userinfo);
        });
      });
   },[])

  const logout = () => {
    fetch('https://blog-application-backend-a9xe.onrender.com/logout', {
      credentials: 'include',
      method: 'POST'
    }).then(() => {
      setUserinfo(null);
    });
  }

const username = userinfo?.username;


  return (
    <header>
    <Link to = "/" className='logo'>ExpressBlog</Link>
    <nav>
      {username && (
        <>
        <Link to = "/create">Create new Post</Link>
        <a onClick={logout}>Logout({username})</a>
        </>
      )}
      {!username && (
        <>
        <Link to = "/login">Login</Link>
        <Link to = "/register">Register</Link>
        </>
      )}
      
    </nav>
  </header>  
  )
}

export default Header