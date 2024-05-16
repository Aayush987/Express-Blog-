/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react"
import Post from "../components/Post"
import Skeleton from '@mui/material/Skeleton';

const HomePage = () => {
   const [posts,setPosts] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const url = 'https://blog-server-lake-nine.vercel.app';
  //  const url2 = 'http://localhost:4000';

  useEffect(() => {
     fetch(`${url}/post`).then(res => {
      res.json().then(data => {
        setPosts(data);
        setIsLoading(false);
        });
      });
  },[])

  return (
    <>
   {isLoading ? (
        <div className="skeleton">
          <Skeleton variant="rectangular" width="100%" height={500} />
          <Skeleton variant="rounded" width="100%" height={500} />
        </div>
      ) : (
        posts.length > 0 && posts.map(post => <Post {...post} />)
      )}
    </>
  )
}

export default HomePage