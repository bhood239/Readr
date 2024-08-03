
const UserList = (props) => {
    const { users, currentUser } = props;

    const isFollowing = (userId) => {
        return currentUser.following_list.some(followingUser => followingUser.id === userId);
    };

    return (
        <ul>
            {users && users.map((user) => (
                <li key={user.id}>
                    <div>{user.name}</div>
                    {isFollowing(user.id) ? (
                        <button>Unfollow</button>
                    ) : (
                        <button>Follow</button>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default UserList;
