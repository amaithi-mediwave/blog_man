import axios from 'axios';
// import { useState } from 'react';


export const getComments = async (article_id) => {

  const res = await axios.get(`/v2/articles/comments/${article_id}`)

  return res.data
}


//   return [
//     {
//       id: "1",
//       body: "First comment",
//       username: "Jack",
//       userId: "1",
//       parentId: null,
//       createdAt: "2021-08-16T23:00:33.010+02:00",
//     },
//     {
//       id: "2",
//       body: "Second comment",
//       username: "John",
//       userId: "2",
//       parentId: null,
//       createdAt: "2021-08-16T23:00:33.010+02:00",
//     },
//     {
//       id: "3",
//       body: "First comment first child",
//       username: "John",
//       userId: "2",
//       parentId: "1",
//       createdAt: "2021-08-16T23:00:33.010+02:00",
//     },
//     {
//       id: "4",
//       body: "Second comment second child",
//       username: "John",
//       userId: "2",
//       parentId: "2",
//       createdAt: "2021-08-16T23:00:33.010+02:00",
//     },
//   ];
// };

export const createComment = async (article_id, user_id, text, parentId = null) => {
  console.log(article_id, user_id, text, parentId);
  const res = await axios.post(`/v2/articles/comments/${article_id}`, {
    user_id,
    article_id,
    comment_data: text,
    parent_id: parentId,
  })
  return res.data 
  // {
  //   id: Math.random().toString(36).substr(2, 9),
  //   body: text,
  //   parentId,
  //   userId: "1",
  //   username: "John",
  //   createdAt: new Date().toISOString(),
  // };
};

export const updateComment = async (text) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};
