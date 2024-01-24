import {useState} from "react";
import 'react-quill/dist/quill.snow.css';
import { Navigate } from "react-router-dom";
import Editor from "../components/Editor";


const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files,setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

 const createNewPost = async (e) => {
    const data = new FormData();
    data.set('title',title);
    data.set('summary',summary);
    data.set('content',content);
    data.set('file',files[0]);

    e.preventDefault();
 const response  = await fetch('https://blog-application-backend-a9xe.onrender.com/post', {
        method: 'POST',
        body: data,
        credentials: 'include'
    });
    if (response.ok) {
        setRedirect(true);
      }
}
   
if(redirect) {
    return <Navigate to = "/" />
}
  
  return (
    <form onSubmit={createNewPost}>
        <input type = "text" value = {title} onChange={(e)=> setTitle(e.target.value)} placeholder="Title" />
        <input type="text" value = {summary} onChange={(e)=> setSummary(e.target.value)} placeholder="Summary" />
        <input type="file" onChange={(e)=> setFiles(e.target.files)} />
        <Editor value = {content} onChange={setContent} />
        <button style = {{marginTop: '5px'}}>Create Post</button>
    </form>
  )
}

export default CreatePost