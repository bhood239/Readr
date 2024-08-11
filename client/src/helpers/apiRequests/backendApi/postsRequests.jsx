import axios from "axios";

// POSTS CRUD

// CREATE
export const createPost = async (params) => {
  try {
    const res = await axios.post(`/api/posts`, params);
    return res.data;
  } catch (err) {
    console.log(
      "error creating post: ",
      err.response ? err.response.data : err.message
    );
    return null;
  }
};

// READ ONE
export const getPostById = async (postId) => {
  try {
    const res = await axios.get(`/api/posts/${postId}`);
    return res.data;
  } catch (err) {
    console.log("error getting post: ", err.message);
    return null;
  }
};

export const getPostByUserIdAndBookId = async (userId, bookId) => {
  try {
    const res = await axios.get(`/api/posts/${userId}/${bookId}`);
    return res.data;
  } catch (err) {
    console.log("error getting post: ", err.message);
    return null;
  }
};

// READ ALL
export const getAllPosts = async () => {
  try {
    const res = await axios.get("/api/posts");
    return res.data;
  } catch (err) {
    console.log("error getting posts: ", err.message);
    return null;
  }
};

// UPDATE
export const updatePostById = async (postId, params) => {
  try {
    const res = await axios.put(`/api/posts/${postId}`, params);
    return res.data;
  } catch (err) {
    console.log("error updating post: ", err.message);
    return null;
  }
};

// DELETE
export const deletePostById = async (postId) => {
  try {
    const res = await axios.delete(`/api/posts/${postId}`);
    return res.data;
  } catch (err) {
    console.log("error deleting post: ", err.message);
    return null;
  }
};

export default {
  createPost,
  getPostById,
  getAllPosts,
  updatePostById,
  deletePostById,
};
