import { useState, useEffect, useContext } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import "./comments.css"
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "../api";

import { Context } from "../../../context/Context";
import { useLocation } from "react-router";


// let commentsUrl ="/v2/articles/comments"



const Comments = ({ commentsUrl, currentUserId }) => {
  const { user } = useContext(Context);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parent_id === null
  );
  console.log(rootComments);

  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parent_id === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  const addComment = (text, parentId) => {
    createCommentApi(path, user._id, text, parentId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      // console.log(comment);
      setActiveComment(null);
    });
  };

  const updateComment = (text, commentId) => {
    updateCommentApi(text).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };
  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi().then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setBackendComments(updatedBackendComments);
      });
    }
  };

  useEffect(() => {
    getCommentsApi(path).then((data) => {
      setBackendComments(data);
    });
  }, []);

  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <div className="comment-form-title">Write comment</div>
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          
          <Comment
            key={rootComment._id}
            comment={rootComment}
            replies={getReplies(rootComment._id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={user._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
