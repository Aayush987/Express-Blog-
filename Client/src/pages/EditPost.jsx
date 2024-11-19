import {useEffect, useState} from 'react';
import { Navigate, useParams } from "react-router-dom";
import Editor from '../components/Editor';


const EditPost = () => {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    // const [files,setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);
      const url = 'https://blog-server-lake-nine.vercel.app/api';
  // const url2 = 'http://localhost:4000/api';

    useEffect(() => {
        fetch(`${url}/posts/post/`+id).then(res => {
            res.json().then(postinfo => {
                setTitle(postinfo.title);
                setSummary(postinfo.summary);
                setContent(postinfo.content);
            });
        });
    },[]);
  
  const updatePost = async (e) => {
       e.preventDefault();
       const data = new FormData();
         data.set('title',title);
         data.set('summary',summary);
         data.set('content',content);
         data.set('id',id);
        //  if(files?.[0]) {
        //     data.set('file',files?.[0]);
        //  }
  const response = await fetch(`${url}/posts/post`, {
        method: 'PUT',
        body: data, 
        credentials: 'include',
       });
       if(response.ok) {
        console.log('Post Updated');
         setRedirect(true);
       }
  }

    if(redirect) {
        return <Navigate to = {'/post/'+id} />
    }
      
      return (
        <form onSubmit={updatePost}>
            <input type = "text" value = {title} onChange={(e)=> setTitle(e.target.value)} placeholder="Title" />
            <input type="text" value = {summary} onChange={(e)=> setSummary(e.target.value)} placeholder="Summary" />
            {/* <input type="file" onChange={(e)=> setFiles(e.target.files)} /> */}
            <Editor value = {content} onChange={setContent} />
            <button style = {{marginTop: '5px'}}>Update Post</button>
        </form>
      )
}

export default EditPost