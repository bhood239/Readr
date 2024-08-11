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
    console.log("Updating post with params:", postId, params);  // Log request params
    const res = await axios.put(`/api/posts/${postId}`, params);
    console.log("Post updated:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error updating post:", err.response ? err.response.data : err.message);  // Improved error logging
    throw err;  // Re-throw the error to be handled by calling code
  }
};

// DELETE
export const deletePostById = async (postId) => {
  try {
    const res = await axios.delete(`/api/posts/${postId}`);
    console.log("Post deleted:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error deleting post:", err.response ? err.response.data : err.message);
    throw err;  // Re-throw the error to be handled by calling code
  }
};

export default {
  createPost,
  getPostById,
  getAllPosts,
  updatePostById,
  deletePostById,
};
