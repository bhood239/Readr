const MiniProfile = (props) => {
    const { user, toRead, reading, read, loadProfile } = props;
    const numOfToRead = toRead.length;
    const numOfReading = reading.length;
    const numOfRead = read.length;

    return (
        <div>
            <img className="profile_picture" src={user.profile_photo} alt={user.username} />
            <span>{user.username}</span>            {/* user name */}
            <div>
                <div>
                    <span>Following</span>
                    <span>{user.following}</span>    {/* Number of following */}
                </div>
                <div>
                    <span>Followers</span>
                    <span>{user.followers}</span>    {/* Number of followers */}
                </div>
            </div>
            <div>
                <div>
                    <span>To Read</span>
                    <span>{numOfToRead}</span>    {/* Number of to read */}
                </div>
                <div>
                    <span>Reading</span>
                    <span>{numOfReading}</span>    {/* Number of reading */}
                </div>
                <div>
                    <span>Read</span>
                    <span>{numOfRead}</span>    {/* Number of read */}
                </div>
            </div>
            <span onClick={() => loadProfile()}>Your Profile</span>
        </div>
    );
};