import { useEffect, useState, useCallback } from "react";
import {
    createPost,
    getPostById,
    getPostByUserIdAndBookId,
    getAllPosts,
    updatePostById,
    deletePostById,
} from "../../apiRequests/backendApi/postsRequests";

// Create Post
export const useCreatePost = (currentUser) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreatePost = async (data) => {
        if (!currentUser) return;
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
export const usePostById = (currentUser, id) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            if (!currentUser) return;
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

export const usePostByUserIdAndBookId = (currentUser) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handlePostByUserIdAndBookId = useCallback(async (userId, bookId) => {
        if (!currentUser) return;
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
    }, []);

    return { post, loading, error, handlePostByUserIdAndBookId };
};

// Read All Posts
export const useAllPosts = (currentUser) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchPosts = async () => {
            if (!currentUser) return;
            setLoading(true);
            setError(null);
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

// Update Post by Id Hook
export const useUpdatePostById = (currentUser) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updatePost = async (id, updatedData) => {
        if (!currentUser) return;
        setLoading(true);
        console.log("Attempting to update post:", id, updatedData);
        try {
            const postData = await updatePostById(id, updatedData);
            console.log("Post updated successfully:", postData);
            setPost(postData);
        } catch (err) {
            console.error("Error updating post:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { post, loading, error, updatePost };
};

// Delete Post by Id Hook
export const useDeletePostById = (currentUser) => {
    const [deleted, setDeleted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deletePost = async (id) => {
        if (!currentUser) return;
        setLoading(true);
        console.log("Attempting to delete post:", id);
        try {
            await deletePostById(id);
            console.log("Post deleted successfully:", id);
            setDeleted(true); // Indicate that the post has been deleted
        } catch (err) {
            console.error("Error deleting post:", err);
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
    usePostByUserIdAndBookId,
    useAllPosts,
    useUpdatePostById,
    useDeletePostById,
};