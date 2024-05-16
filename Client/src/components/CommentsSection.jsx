import { useState, useContext, useEffect } from "react"
import { UserContext } from "../UserContext";
import {formatDistanceToNow} from "date-fns";

const CommentsSection = ({ postId }) => {
   const [comments, setComments] = useState([]);
    const {userinfo} = useContext(UserContext);
    const [newComment,setNewComment] = useState(''); 
    const url = 'https://blog-server-lake-nine.vercel.app';
    // const url2 = 'http://localhost:4000';

  const fetchComments = async () => {
    try {
        const response = await fetch(`${url}/post/${postId}`);
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
        <h2>Comments</h2>
        {userinfo && (
            <div className="comments-input">
                 <textarea 
                    rows = "4"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange = {(e) => setNewComment(e.target.value)}
                    />
                 <button className="button" onClick={addComment}>Post Comment</button>
            </div>
        )} 
        {!userinfo && (
            <p>Please log in to add a comment.</p>
        )}
        <div className="comments-list">
            {comments.map((comment) => (
               <div key={comment._id} className="comment">
                <div className="comment-header">
                    <div className="comment-author">
                       <p>@{comment.author.username}</p>
                    </div>
                    <div className="comment-time">
                       <time>{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</time>
                    </div>
                </div>
                <p>{comment.content}</p>
                </div>
            ))}
        </div>
    </div>
  )


}

export default CommentsSection