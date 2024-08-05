import { useEffect, useState } from "react";
import {
  createPost,
  getPostById,
  getPostByUserIdAndBookId,
  getAllPosts,
  updatePostById,
  deletePostById,
} from "../../apiRequests/backendApi/postsRequests";

// Create Post
export const useCreatePost = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreatePost = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const createdPost = await createPost(data);
      setPost(createdPost);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { post, loading, error, handleCreatePost };
};

// Read Post by Id
export const usePostById = (id) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPostById(id);
        setPost(postData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  return { post, loading, error };
};

export const usePostByUserIdAndBookId = (userId, bookId) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const handlePostByUserIdAndBookId = async (userId, bookId) => {
        setLoading(true);
        setError(null);
        try {
          const post = await getPostByUserIdAndBookId(userId, bookId);
          setPost(post);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
    
  
    return { post, loading, error, handlePostByUserIdAndBookId };
};

// Read All Posts
export const useAllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postData = await getAllPosts();
        setPosts(postData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return { posts, loading, error };
};

// Update Post by Id
export const useUpdatePostById = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updatePost = async (id, updatedData) => {
    setLoading(true);
    try {
      const postData = await updatePostById(id, updatedData);
      setPost(postData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { post, loading, error, updatePost };
};

// Delete Post by Id
export const useDeletePostById = () => {
  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deletePost = async (id) => {
    setLoading(true);
    try {
      await deletePostById(id);
      setDeleted(true); // Indicate that the post has been deleted
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { deleted, loading, error, deletePost };
};

export default {
  useCreatePost,
  usePostById,
  useAllPosts,
  useUpdatePostById,
  useDeletePostById,
};
