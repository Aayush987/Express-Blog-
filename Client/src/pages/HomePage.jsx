import { useEffect, useState } from "react"
import Post from "../components/Post"

const HomePage = () => {
   const [posts,setPosts] = useState([]);

  useEffect(() => {
     fetch("http://localhost:4000/post").then(res => {
      res.json().then(data => {
        setPosts(data);
        });
      });
  },[])

  return (
    <>
   {posts.length > 0 && posts.map(post => (
    <Post {...post} />
   ))}
    </>
  )
}

export default HomePage