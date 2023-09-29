import axios from 'axios';

//------------------------------------------------------
//          GET COMMENTS
//------------------------------------------------------
export const getComments = async (article_id) => {
  const res = await axios.get(`/articles/comments/${article_id}`)
  return res.data
}

//------------------------------------------------------
//          CREATE A NEW COMMENT
//------------------------------------------------------
export const createComment = async (article_id, user_id, text, parentId) => {
  const res = await axios.post(`/articles/comments/${article_id}`, {
    user_id,
    article_id,
    comment_data: text,
    parent_id: parentId,
  });
  return res.data
};

//------------------------------------------------------
//          UPDATED COMMENT
//------------------------------------------------------
export const updateComment = async (comment_id, text) => {
  const res = await axios.put(`/articles/comments/${comment_id}`, {
    comment_data: text,
  });
  return res.data
};

//------------------------------------------------------
//          DELETE COMMENT
//------------------------------------------------------
export const deleteComment = async (comment_id) => {
  const res = await axios.delete(`/articles/comments/${comment_id}`);
  // return res.data
  return res
};
