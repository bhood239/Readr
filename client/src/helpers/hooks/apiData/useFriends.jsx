import { useState } from "react";
import { createFriend, deleteFriend } from "../../apiRequests/backendApi/friendRequests";

export const useCreateFriend = () => {
    const [friend, setFriend] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreateFriend = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const createdFriend = await createFriend(data);
            setFriend(createdFriend);
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

    const handleDeleteFriend = async (data) => {
        setLoading(true);
        setError(null);
        try {
            await deleteFriend(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, handleDeleteFriend };
}