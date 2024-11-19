import { useState } from "react"
import { useNavigate } from "react-router-dom"


const RegisterPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [about_me, setAboutMe] =  useState('')
    const [socials, setSocials] = useState({twitter: '', linkedIn: '', github: ''})
      const url = 'https://blog-server-lake-nine.vercel.app/api';
  // const url2 = 'http://localhost:4000/api';
 
const register = async (e) => {
    e.preventDefault();
   const response = await fetch(`${url}/auth/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username,password,about_me,socials})
    });
   if(response.status === 200) {
        // console.log({socials});
        alert('Registeration Successful');
        navigate('/login');    
    }else {
        alert('Registeration Failed');
    }



}

  return (
      <div className="RegisterContainer">
        <div className="RegisterCard">
              <h1 className="card-title">Register</h1>
              <form onSubmit={register}>
                <div className="form-group">
                    <label htmlFor= "username">Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" required />
                </div>
                <div className="form-group">
                    <label htmlFor= "password">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" required />
                </div>
                <div className="form-group">
                    <label htmlFor= "about">About Yourself</label>
                    <textarea id="about" rows={4} type= "text" value={about_me} onChange={(e) => setAboutMe(e.target.value)} placeholder="About me..."  required/>
                </div>
                <div className="form-group">
                    <label>Social Links</label>
                    <div className="social-links">
                      <div>
                        <label htmlFor= "twitter">Twitter</label>
                        <input type="text" value={socials.twitter} onChange={(e) => setSocials({...socials, twitter: e.target.value})} placeholder="Twitter" />
                      </div>
                      <div>
                        <label htmlFor= "Linkedin">Linkedin</label>
                        <input type="text" value={socials.linkedIn} onChange={(e) => setSocials({...socials, linkedIn: e.target.value})} placeholder="LinkedIn" />
                      </div>
                      <div>
                        <label htmlFor= "Github">Github</label>
                        <input type="text" value={socials.github} onChange={(e) => setSocials({...socials, github: e.target.value})} placeholder="GitHub" />
                      </div>
                    </div>
                </div>
                <button type="submit" className="submit-button">Register</button>
              </form>
        </div>
      </div>
    // <form className="register" onSubmit={register}>
    //     <h1>Register</h1>
    //   <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
    //   <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
    //   <textarea type= "text" value={about_me} onChange={(e) => setAboutMe(e.target.value)} placeholder="About me..." />
    //   <input type="text" value={socials.twitter} onChange={(e) => setSocials({...socials, twitter: e.target.value})} placeholder="Twitter" />
    //   <input type="text" value={socials.linkedIn} onChange={(e) => setSocials({...socials, linkedIn: e.target.value})} placeholder="LinkedIn" />
    //   <input type="text" value={socials.github} onChange={(e) => setSocials({...socials, github: e.target.value})} placeholder="GitHub" />
    //   <button>Register</button>
    // </form>
  )
}

export default RegisterPage