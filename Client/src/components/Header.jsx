import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { UserContext} from '../UserContext'


const Header = () => {
  const url = 'https://blog-server-lake-nine.vercel.app/api/auth';
  // const url2 = 'http://localhost:4000/api/auth';
    const {setUserinfo, userinfo} = useContext(UserContext);
 
   useEffect(() => {
    fetch(`${url}/profile`, {
      credentials: 'include'
  }).then(res => {
      if (res.ok) {
          res.json().then(userinfo => {
              setUserinfo(userinfo);
          });
      } else {
          setUserinfo(null); 
      }
  });
}, [setUserinfo]);

const logout = () => {
  fetch(`${url}/logout`, {
      credentials: 'include',
      method: 'POST'
  }).then(res => {
      if (res.ok) {
          setUserinfo(null);
      }
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