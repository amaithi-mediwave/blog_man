import { useState, useEffect, useContext } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { Context } from "../../../context/Context";
import "./comments.css"
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "../api";

import { useLocation } from "react-router";


// let commentsUrl ="/v2/articles/comments"



const Comments = () => {
  const { user } = useContext(Context);
  // console.log(`user = ${user}`);
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parent_id === null
  );
  // console.log(path);

  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parent_id === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  const addComment = (text, parentId) => {
    createCommentApi(path, user._id, text, parentId).then((comment) => {
      // console.log(comment.newComment);
      comment = comment.newComment;
      setBackendComments([comment, ...backendComments]);
      // console.log(comment);
      setActiveComment(null);
    });
  };

  const updateComment = (commentId, text) => {
    updateCommentApi(commentId, text).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment._id === commentId) {
          return { ...backendComment, comment_data: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };
  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi(commentId).then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment._id !== commentId
        );
        setBackendComments(updatedBackendComments);
      });
    }
  };

  useEffect(() => {
    getCommentsApi(path).then((data) => {
      setBackendComments(data);
    });
  }, [path]);

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
