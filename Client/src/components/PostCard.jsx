import { formatISO9075 } from "date-fns";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./PostCard.css";



const PostCard = ({_id,title, summary, content, createdAt, author}) => {
const [postinfo, setPostinfo] = useState(null);
  const [cover, setCover] = useState(null);
  const url = 'https://blog-server-lake-nine.vercel.app/api';
  // const url2 = 'http://localhost:4000/api';

  useEffect(() => {
    // console.log(id);
    fetch(`${url}/posts/post/${_id}`)
      .then(res => res.json())
      .then(postinfo => {
        setPostinfo(postinfo);

        const extractFirstImage = (content) => {
          const match = content.match(/<img[^>]+src="([^">]+)"/i);
          return match ? match[1] : null;
        };

        const cover = extractFirstImage(postinfo.content);
        // console.log(cover);
        setCover(cover);
      });
  }, []);
    return (
        <div className="post-card">
          <Link to = {`/post/${_id}`}><img className="post-image" src = {cover ? cover : 'https://via.placeholder.com/400'} alt="cover" /> </Link>
            <div className="post-content">
                <Link to = {`/post/${_id}`}><h3 className="post-title">{title}</h3></Link>
                <p className="post-summary">{summary}</p>
                  <div className="post-meta">
                     <div className="post-author">
                      <Link to = {`/author/${author.username}`}><span className="author">{author.username}</span></Link>
                     </div>
                     <time>{formatISO9075(new Date(createdAt))}</time>
                  </div>
            </div>
        </div>
    );
};


export default PostCard;