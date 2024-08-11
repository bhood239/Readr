import { useCallback, useEffect, useState } from "react";
import {
    createUser,
    getUserById,
    getAllUsers,
    getUsersByName,
    updateUserById,
    deleteUserById,
} from "../../apiRequests/backendApi/usersRequests";

// CRUD
// Create
export const useCreateUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreateUser = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const createdUser = await createUser(data);
            setUser(createdUser);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { user, loading, error, handleCreateUser };
};

// Read one
export const useUserById = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getUser = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const userData = await getUserById(id);
            setUser(userData);
            return userData;
        } catch (err) {
            setError(err);
            throw err; // Re-throw to handle in the component
        } finally {
            setLoading(false);
        }
    });

    return { user, loading, error, getUser };
};

// Read all
export const useAllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userData = await getAllUsers();
                setUsers(userData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    return { users, loading, error };
};

// SEARCH BY NAME
export const useUsersByName = (name) => {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUsersByName(name);
                setUsers(userData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [name]);

    return { users, loading, error };
};

// Update by Id
export const useUpdateUserById = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateUser = async (id, updatedData) => {
        setLoading(true);
        try {
            const userData = await updateUserById(id, updatedData);
            setUser(userData);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { user, loading, error, updateUser };
};

// Delete by Id
export const useDeleteUserById = () => {
    const [deleted, setDeleted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteUser = async (id) => {
        setLoading(true);
        try {
            await deleteUserById(id);
            setDeleted(true);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { deleted, loading, error, deleteUser };
};

export default {
    useUserById,
    useAllUsers,
    useCreateUser,
    useUsersByName,
    useUpdateUserById,
    useDeleteUserById,
};
