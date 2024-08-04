
const UserList = (props) => {
    const { users, currentUser, handleCreateFriend, handleDeleteFriend } = props;

    const isFollowing = (userId) => {
        return currentUser.following_list?.some(followingUser => followingUser.id === userId);
    };
    const isFollower = (userId) => {
        return currentUser.follower_list?.some(follower => follower.id === userId);
    };

    const follow = (userId) => {
        handleCreateFriend({follower_id: currentUser.id, following_id: userId});
    };

    const unFollow = (userId) => {
        handleDeleteFriend({follower_id: currentUser.id, following_id: userId});
    };

    const removeFollower = (userId) => {
        handleDeleteFriend({follower_id: userId, following_id: currentUser.id});
    };

    return (
        <ul>
            {users && users.map((user) => (
                <li key={user.id}>
                    <div>{user.name}</div>
                    {isFollowing(user.id) ? (
                        <button onClick={() => unFollow(user.id)}>Unfollow</button>
                    ) : (
                        <button onClick={() => follow(user.id)}>Follow</button>
                    )}
                    {isFollower(user.id) && (
                        <button onClick={() => removeFollower(user.id)}>Remove Follower</button>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default UserList;
