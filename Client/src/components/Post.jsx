import {formatISO9075} from "date-fns";
import { Link } from "react-router-dom";
// import { JSDOM } from 'jsdom';
import { useEffect, useState } from "react";

const Post = ({_id,title, summary, content, createdAt, author}) => {
  const [postinfo, setPostinfo] = useState(null);
  const [cover, setCover] = useState(null);
  const url = 'https://blog-server-lake-nine.vercel.app';
  // const url2 = 'http://localhost:4000';

  useEffect(() => {
    // console.log(id);
    fetch(`${url}/post/${_id}`)
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
    <div className="post">
      <div className="image">
      <Link to = {`/post/${_id}`}>
      <img src={cover ? cover : 'https://via.placeholder.com/400'} alt='image' />
      {/* <img src={'https://blog-server-lake-nine.vercel.app/'+cover} alt='image' /> */}
      </Link>
      </div>
      <div className="content">
      <Link to = {`/post/${_id}`}>
      <h2>{title}</h2>
      </Link>
      <p className="info">
        <a href="" className="author">{author.username}</a>
        <time>{formatISO9075(new Date(createdAt))}</time>
      </p>
      <p className='summary'>{summary}</p>
      </div>
      </div> 
  )
}

export default Post