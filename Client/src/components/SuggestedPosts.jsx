import { useState, useEffect } from "react";
import Post from "../components/Post";
import PostCard from "./PostCard";


const SuggestedPosts = ({PostTitle, PostSummary, PostAuthor}) => {

       const url = 'https://blog-server-lake-nine.vercel.app/api';
//    const url2 = 'http://localhost:4000/api';

    const [suggestedPosts, setSuggestedPosts] = useState([]);
    const [loading, setLoading] = useState(false);

   
    useEffect(() => {
        setLoading(true);
        const getData = async () => {
            try {
                const response = await fetch(`${url}/posts/searchPost?q=${PostAuthor}`);
                const data = await response.json();
                setSuggestedPosts(data.filter(post => post.title !== PostTitle && post.summary !== PostSummary));
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };
        getData();
    },[]);


    return (
        <div className="container">
            <section className="suggested-posts">
                <h2 className="suggested-posts-title">More Posts like this:</h2>
            <div className="posts-grid">
            {loading ? <p>Loading....</p> : (
                suggestedPosts.length > 0 ? (
                    suggestedPosts.map((post) => (
                       <PostCard 
                        key={post._id}
                        _id={post._id}
                        title={post.title}
                        summary={post.summary}
                        content={post.content}
                        createdAt={post.createdAt}
                        author={post.author} />
                        // <Post  
                        // key={post._id}
                        // _id={post._id}
                        // title={post.title}
                        // summary={post.summary}
                        // content={post.content}
                        // createdAt={post.createdAt}
                        // author={post.author} />
                    ))
                ) : <p>No suggested posts found</p>
            ) }
            </div>
            </section>
        </div>
    );
};

export default SuggestedPosts;