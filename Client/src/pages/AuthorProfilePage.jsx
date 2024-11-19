import {Link, useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
// import Post from "../components/Post";
import "./AuthorProfile.css";
// import PostCard from '../components/PostCard';
import { FaUserCircle } from 'react-icons/fa';



const AuthorProfilePage = () => {
    const url = 'https://blog-server-lake-nine.vercel.app/api';
    // const url2 = 'http://localhost:4000/api';

    const {name} = useParams();

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${url}/auth/profile/${name}`);
                const data = await res.json();
                setData(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchData();
    },[]);


    return (
        <div className='container'>
            <div className='card'>
                <div className='card-header'>
                    <div className='Authoravatar'>
                        <FaUserCircle size = {100} />
                    </div>
                    <div className='author-info'>
                        <h1 className='author-name'>{name}</h1>
                        <p className="author-role">AI Researcher & Tech Blogger</p>
                        <div className='social-links'>
                        <a href={data.socials?.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                            <span className="sr-only">Twitter</span>
                        </a>
                        <a href={data.socials?.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                            <span className="sr-only">LinkedIn</span>
                        </a>
                        <a href={data.socials?.github} target="_blank" rel="noopener noreferrer" className="social-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                            <span className="sr-only">GitHub</span>
                        </a>
                        </div>
                    </div>
                </div>
                <div className='card-content'>
                    <p className='author-bio'>{data.about_me}</p>
                    <hr className="separator" />
                    <h2 className="recent-posts-title">Recent Posts</h2>
                    <div className='recent-posts'>
                    {data.posts?.map(post => (
                //    <PostCard 
                //    key={post._id}
                //    _id={post._id}
                //    title={post.title}
                //    summary={post.summary}
                //    content={post.content}
                //    createdAt={post.createdAt}
                //    author={post.author} />
                <div key={post._id} className='post-card'>
                  <Link to = {`/post/${post._id}`}><h3 className='post-title'>{post.title}</h3></Link>
                    <p className='post-excerpt'>{post.summary}</p>
                    <div className='post-meta'>
                    <span className="post-date">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                              {post.createdAt}
                            </span>
                    </div>
                </div>
                ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthorProfilePage;