import axios from 'axios';
// import { useState } from 'react';


export const getComments = async (article_id) => {

  const res = await axios.get(`/v2/articles/comments/${article_id}`)

  return res.data
}

export const createComment = async (article_id, user_id, text, parentId) => {
  // console.log(article_id, user_id, text, parentId);
  const res = await axios.post(`/v2/articles/comments/${article_id}`, {
    user_id,
    article_id,
    comment_data: text,
    parent_id: parentId,
  });
  return res.data
  };

export const updateComment = async (text) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};
