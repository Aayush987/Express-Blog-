/* eslint-disable react/jsx-key */
import { useEffect, useRef, useState, useCallback } from "react"
import Post from "../components/Post"
import Skeleton from '@mui/material/Skeleton';

const HomePage = () => {
   const [posts,setPosts] = useState([]);
   const [filteredPosts, setFilteredPosts] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const page = useRef(2);
   const [searchText, setSearchText] = useState('');
   const [postLoading, setPostLoading] = useState(false);
   const url = 'https://blog-server-lake-nine.vercel.app/api';
  //  const url2 = 'http://localhost:4000/api';


   const fetchData = useCallback(async () => {
    if (postLoading) return;

    setPostLoading(true);
    try {
      if(page.current != null) {
      const response = await fetch(`${url}/posts/post?page=${page.current}&limit=3`);
      const data = await response.json();
      if(data == null) {
        alert("No more posts to load");
      }
      if (data.length < 3) {
        console.log('few page returned');
        console.log(page.current);
        // If fewer than 4 blogs are returned, stop further requests
        console.log("Data", data);
        setPosts((prevBlogs) => [...prevBlogs, ...data]);
        // setPage(null); 
        page.current = null;
        console.log("page is setted to null");
        console.log("Now Page", page.current);
        // Null indicates no more pages to load
        return;
      }else {
        setPosts((prevBlogs) => [...prevBlogs, ...data]);
        // setPage((prevPage) => prevPage + 1);
        page.current = page.current + 1;
      }  
    }else {
        console.log("No more posts to load");
        return;
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setPostLoading(false);
    }
  },[postLoading]);


  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
          const response = await fetch(`${url}/posts/post?page=1&limit=3`);
          const data = await response.json();
          setPosts(data);  
     
      }catch (error) {
        console.error("Error fetching posts:", error);
      }
       setIsLoading(false);
    }

    getData(); 
  },[])

    useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchData]);

  useEffect(() => {
    if(searchText === '') return;
    
    const handleSearch = async () => {
      try {
        const response = await fetch(`${url}/posts/SearchPost?q=${searchText}`);
        const data = await response.json();
        console.log(data);
        setFilteredPosts(data);
      }catch (error) {
        console.error(error);
      }
    };

    handleSearch();
  },[searchText]);


  return (
    <>
    {isLoading ? (
       <div className="skeleton">
          <Skeleton variant="rectangular" width="100%" height={500} />
          <Skeleton variant="rounded" width="100%" height={500} />
       </div>
    ) : (
       <div>
          <input
             type="text"
             value={searchText}
             placeholder="Search a specific post.."
             onChange={(e) => setSearchText(e.target.value)}
             className="search-input"
          />
      {/* Conditionally render posts */}
      {searchText === '' ? (
                  posts.length > 0 && posts.map(post => (
                     <Post
                        key={post._id}
                        _id={post._id}
                        title={post.title}
                        summary={post.summary}
                        content={post.content}
                        createdAt={post.createdAt}
                        author={post.author}
                     />
                  ))
               ) : (
                  filteredPosts.length > 0 && filteredPosts.map(post => (
                     <Post
                        key={post._id}
                        _id={post._id}
                        title={post.title}
                        summary={post.summary}
                        content={post.content}
                        createdAt={post.createdAt}
                        author={post.author}
                     />
                  ))
               )}

               {postLoading && <p>Loading More Posts...</p>}
               {page.current === null && <p>No more posts to load</p>}
            </div>
      )}
    </>
  )
}

export default HomePage