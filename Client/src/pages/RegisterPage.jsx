import { useState } from "react"


const RegisterPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
 
const register = async (e) => {
    e.preventDefault();
   const response = await fetch('https://blog-server-lake-nine.vercel.app/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username,password})
    });
   if(response.status === 200) {
        alert('Registeration Successful');
    }else {
        alert('Registeration Failed');
    }



}

  return (
    <form className="register" onSubmit={register}>
        <h1>Register</h1>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
      <button>Register</button>
    </form>
  )
}

export default RegisterPage