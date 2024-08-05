import { useState } from "react";
import useUserBooks from "./useUserBooksData";
import { createFriend, deleteFriend } from "../../apiRequests/backendApi/friendRequests";

export const useCreateFriend = () => {
    const [friend, setFriend] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { currentUser, setCurrentUser } = useUserBooks();

    const handleCreateFriend = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const createdFriend = await createFriend(data);
            setFriend(createdFriend);
            if (!currentUser) {
                setCurrentUser({
                    id: data.follower_id,
                    following_list: [],
                    followers_list: []
                });
            } else {
                // Update currentUser's following_list
                setCurrentUser(prevUser => ({
                    ...prevUser,
                    following_list: [...(prevUser.following_list ?? []), { id: data.following_id }]
                }));
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { friend, loading, error, handleCreateFriend };
}

export const useDeleteFriend = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { currentUser, setCurrentUser } = useUserBooks();

    const handleDeleteFriend = async (data) => {
        setLoading(true);
        setError(null);
        try {
            await deleteFriend(data);
            // Check if the current user is the following_id or follower_id
            if (data.following_id === currentUser.id) {
                // Update followers_list
                setCurrentUser(prevUser => ({
                    ...prevUser,
                    followers_list: prevUser.followers_list.filter(user => user.id !== data.follower_id)
                }));
            } else {
                // Update following_list
                setCurrentUser(prevUser => ({
                    ...prevUser,
                    following_list: prevUser.following_list.filter(user => user.id !== data.following_id)
                }));
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, handleDeleteFriend };
}