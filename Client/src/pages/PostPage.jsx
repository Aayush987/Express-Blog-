import { formatISO9075 } from "date-fns";
import { useContext, useEffect, useState } from "react"
import { useParams,Link } from "react-router-dom"
import { UserContext } from "../UserContext";
import CommentsSection from "../components/CommentsSection";
import Skeleton from '@mui/material/Skeleton';
import { FaUser } from "react-icons/fa";
import { Helmet } from 'react-helmet';
import SuggestedPosts from "../components/SuggestedPosts";
import Express_Blog_Cover from "../assets/Express_Blog_Cover.jpg";

const PostPage = () => {
    const [postinfo, setPostinfo] = useState(null);
    const {userinfo} = useContext(UserContext);
    const [cover, setCover] = useState(null);
    const {id} = useParams();
    const url = 'https://blog-server-lake-nine.vercel.app/api';
    // const url2 = 'http://localhost:4000/api';
    useEffect(() => {
        console.log(id);
         fetch(`${url}/posts/post/${id}`).then(
            res => {
               res.json().then(postinfo => {
                // console.log(postinfo);
                  setPostinfo(postinfo);
                  const extractFirstImage = (data) => {
                    const match = data.match(/<img[^>]+src="([^">]+)"/i);
                    return match ? match[1] : null;
                };
            
                const cover = postinfo.content ? extractFirstImage(postinfo.content) : null;
                // console.log('cover:', cover);
                setCover(cover);
               });
            });
    },[]);

   if (!postinfo) {
        return <div className="skeleton">
            <Skeleton variant="text" sx={{ fontSize: "5rem", width: "100%" }} />
            <Skeleton variant="rectangular" width="100%" height={500} />
            <Skeleton variant="rounded" width="100%" height={500} />
            </div>;
   }
  return (
    // <div className="post-page">
      <div className= "container">
        <Helmet>
          <title>{postinfo.title}</title>
          <meta property="og:title" content={postinfo.title} />
          <meta property="og:description" content={postinfo.summary} />
          <meta property="og:image" content={Express_Blog_Cover} />
          <meta property="og:url" content={`https://express-blog-zeta.vercel.app/post/${id}`} />
          <meta property="og:type" content= "article" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={postinfo.title} />
          <meta name="twitter:description" content={postinfo.summary} />
          <meta name="twitter:image" content={Express_Blog_Cover} />    
          <meta name="twitter:url" content={`https://express-blog-zeta.vercel.app/post/${id}`} /> 
       </Helmet>
        <article className="blog-post">
          <img className="cover-image" src = {cover ? cover : 'https://via.placeholder.com/400'} alt="cover" />
          <div className="blog-content">
           <header className="blog-header">
                <h1 className="blog-title">{postinfo.title}</h1>      
          </header>
          {userinfo?.id === postinfo.author._id && (
                <div className="edit-row">
                  <Link className="edit-btn" to = {`/edit/${postinfo._id}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                      Edit this Post
                  </Link>
              </div>
                )}     
           <div className="blog-meta">
                   <FaUser size={1} className="avatar" />
                    <span className="blog-author">{postinfo.author.username}</span>
                    <time>{formatISO9075(new Date(postinfo.createdAt))}</time>
              </div> 
              <div className="blog-body" dangerouslySetInnerHTML={{__html: postinfo.content}} />
           </div>
        </article>
        <CommentsSection postId = {id} />
        <SuggestedPosts 
            PostTitle={postinfo.title}
            PostSummary={postinfo.summary}
            PostAuthor={postinfo.author.username} />
    </div>
    // </div>
  )
}

export default PostPage