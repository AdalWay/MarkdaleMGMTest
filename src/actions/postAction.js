import { GET_POSTS, ADD_POSTS } from "./types";

export const getPosts = () => {
  return {
    type: GET_POSTS
  };
};
export const addPosts = (post) => {
  return {
    type: ADD_POSTS,
    payload: post
  };
};
