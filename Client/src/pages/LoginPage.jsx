import {useContext, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {UserContext} from '../UserContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUserinfo} = useContext(UserContext);
  const url = 'https://blog-server-lake-nine.vercel.app/api';
  // const url2 = 'http://localhost:4000/api';
  
  const login = async (e) => {
    e.preventDefault();
   const response = await fetch(`${url}/auth/login`, {
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
    <div className='RegisterContainer'>
      <div className='RegisterCard'>
          <h1 className='card-title'>Login</h1>
          <form className="login" onSubmit={login}>
            <div className='form-group'>
              <label htmlFor='username'>Username</label>
              <input type="text" value = {username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input type="password" value = {password} onChange = {(e) => setPassword(e.target.value)} placeholder="password" />
            </div>
            <button type='submit' className='submit-button'>Login</button>
          </form>
      </div>
    </div>
  )
}

export default LoginPage