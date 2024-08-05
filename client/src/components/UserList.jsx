import { useEffect, useState } from "react";

const UserList = (props) => {
    const { users, currentUser, handleCreateFriend, handleDeleteFriend } = props;

    const [buttonStates, setButtonStates] = useState({});

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

    const follow = async (userId) => {
        await handleCreateFriend({ follower_id: currentUser.id, following_id: userId });
        updateButtonState(userId, 'follow', 'Unfollow');
    };

    const unFollow = async (userId) => {
        await handleDeleteFriend({ follower_id: currentUser.id, following_id: userId });
        updateButtonState(userId, 'follow', 'Follow');
    };

    const removeFollower = async (userId) => {
        await handleDeleteFriend({ follower_id: userId, following_id: currentUser.id });
        updateButtonState(userId, 'removeFollower', 'Removed');
    };

    return (
        <ul className="user-list">
            {users && users.map((user) => {
                const followButtonText = buttonStates[user.id]?.follow ?? (isFollowing(user.id) ? 'Unfollow' : 'Follow');
                const removeFollowerButtonText = buttonStates[user.id]?.removeFollower ?? (isFollower(user.id) ? 'Remove Follower' : null);

                return (
                    <li key={user.id}>
                        <div>{user.name}</div>
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
        </ul>
    );
};

export default UserList;
