import {useContext, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {UserContext} from '../UserContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUserinfo} = useContext(UserContext);
  
  const login = async (e) => {
    e.preventDefault();
   const response = await fetch('https://blog-server-lake-nine.vercel.app/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username,password}),
      credentials: 'include'
    })
    if(response.ok) {
      response.json().then(userinfo => {
        setUserinfo(userinfo);
        setRedirect(true);
      })
    }else {
      alert('Wrong Credentials');
    }
  }
if (redirect) {
  return <Navigate to = {'/'} />
}

  return (
    <form className="login" onSubmit={login}>
        <h1>Login</h1>
      <input type="text" value = {username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
      <input type="password" value = {password} onChange = {(e) => setPassword(e.target.value)} placeholder="password" />
      <button>Login</button>
    </form>
  )
}

export default LoginPage