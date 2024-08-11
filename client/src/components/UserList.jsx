import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import '../styles/UserList.css';
import Profile from "../routes/Profile";
import { useUserById } from "../helpers/hooks/apiData/useUserData";

const UserList = (props) => {
    const { users, currentUser, setCurrentUser, selectedUser, setSelectedUser, wantToRead, reading, read, favBooks, handleCreateFriend, handleDeleteFriend } = props;

    const [buttonStates, setButtonStates] = useState({});
    const { getUser } = useUserById();
    const navigate = useNavigate();

    const isFollowing = (userId) => {
        return currentUser.following_list?.some(followingUser => followingUser.id === userId);
    };
    const isFollower = (userId) => {
        return currentUser.followers_list?.some(follower => follower.id === userId);
    };

    const updateButtonState = (userId, type, action) => {
        setButtonStates(prevState => ({
            ...prevState,
            [userId]: {
                ...prevState[userId],
                [type]: action
            }
        }));
    };

    const handleUserClick = (user) => {
        setSelectedUser(user);
        navigate('/profile');
    };
    console.log('users:', users);

    const follow = async (userId) => {
        await handleCreateFriend({ follower_id: currentUser.id, following_id: userId });
        const updatedUser = await getUser(currentUser.id)
        setCurrentUser(updatedUser);
        updateButtonState(userId, 'follow', 'Unfollow');
    };

    const unFollow = async (userId) => {
        await handleDeleteFriend({ follower_id: currentUser.id, following_id: userId });
        const updatedUser = await getUser(currentUser.id)
        setCurrentUser(updatedUser);
        updateButtonState(userId, 'follow', 'Follow');
    };

    const removeFollower = async (userId) => {
        await handleDeleteFriend({ follower_id: userId, following_id: currentUser.id });
        const updatedUser = await getUser(currentUser.id)
        setCurrentUser(updatedUser);
        updateButtonState(userId, 'removeFollower', 'Removed');
    };

    return (
        <ul className="user-list">
            {users && users.map((user) => {
                const followButtonText = buttonStates[user.id]?.follow ?? (isFollowing(user.id) ? 'Unfollow' : 'Follow');
                const removeFollowerButtonText = buttonStates[user.id]?.removeFollower ?? (isFollower(user.id) ? 'Remove Follower' : null);

                return (
                    <li key={user.id}>
                        <img src={user.profile_pic} alt="Profile Picture" />
                        <div onClick={() => handleUserClick(user)}>{user.name}</div>
                        {user.id !== currentUser.id && (
                            <>
                                <button
                                    onClick={() => followButtonText === 'Follow' ? follow(user.id) : unFollow(user.id)}
                                >
                                    {followButtonText}
                                </button>
                                {removeFollowerButtonText && (
                                    <button
                                        onClick={() => removeFollower(user.id)}
                                        disabled={removeFollowerButtonText === 'Removed'}
                                    >
                                        {removeFollowerButtonText}
                                    </button>
                                )}
                            </>
                        )}

                    </li>
                );
            })}
            <Routes>
                <Route
                    path="/profile"
                    element={
                        currentUser && (
                            <Profile
                                currentUser={currentUser}
                                selectedUser={selectedUser}
                                wantToRead={wantToRead}
                                reading={reading}
                                read={read}
                                favBooks={favBooks}
                                handleCreateFriend={handleCreateFriend}
                                handleDeleteFriend={handleDeleteFriend}
                            />
                        )
                    }
                />
            </Routes>
        </ul>
    );
};

export default UserList;
