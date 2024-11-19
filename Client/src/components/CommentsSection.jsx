import { useState, useContext, useEffect } from "react"
import { UserContext } from "../UserContext";
import {formatDistanceToNow} from "date-fns";
import { FaUser } from "react-icons/fa";

const CommentsSection = ({ postId }) => {
   const [comments, setComments] = useState([]);
    const {userinfo} = useContext(UserContext);
    const [newComment,setNewComment] = useState(''); 
    const username = userinfo?.username;
    const url = 'https://blog-server-lake-nine.vercel.app/api';
    // const url2 = 'http://localhost:4000/api';

  const fetchComments = async () => {
    try {
        const response = await fetch(`${url}/posts/post/${postId}`);
        const postData = await response.json();
        setComments(postData.comments);
    } catch (error) {
        console.error('Error fetching Comments:' , error);
    }
  }
  useEffect(() => {
      fetchComments();
  },[]);

  const addComment = async () => {
    try {
        const response = await fetch(`${url}/post/${postId}/comment`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({content: newComment}),
        });
        if(response.ok) {
            setNewComment('');
            fetchComments();
        }else {
            console.error("Failed to add Comment: ");
        }
    } catch (error) {
         console.log("Error adding Comment: ", error);
    }
  };

  return (
    <div className="comments-section">
        <h2 className="comments-title">Comments</h2>
        {username && (
            <form className="comment-form">
                 <textarea 
                    className="comment-input"
                    rows = "4"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange = {(e) => setNewComment(e.target.value)}
                    />
                 <button className="submit-comment" onClick={addComment}>Post Comment</button>
            </form>
        )} 
        {!username && (
            <p>Please log in to add a comment.</p>
        )}
        <div className="comments-list">
            {comments.map((comment) => (
               <div key={comment._id} className="comment">
                <header className="comment-header">
                    <FaUser size={1} className="avatar" />
                    <div className="comment-meta">
                       <span className="comment-author">{comment.author.username}</span>
                       <time className="comment-date">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</time>
                    </div>
                </header>
                <p>{comment.content}</p>
                </div>
            ))}
        </div>
    </div>
  )


}

export default CommentsSection