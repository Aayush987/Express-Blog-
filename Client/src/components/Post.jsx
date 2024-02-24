import {formatISO9075} from "date-fns";
import { Link } from "react-router-dom";

const Post = ({_id,title, summary, cover, content, createdAt, author}) => {
  return (
    <div className="post">
      <div className="image">
      <Link to = {`/post/${_id}`}>
      <img src={'https://blog-server-lake-nine.vercel.app/'+cover} alt='image' />
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