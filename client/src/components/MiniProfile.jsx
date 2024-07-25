const MiniProfile = (props) => {

    return (
        <div>
            <img className="profile_picture" src={} alt={} />
            <span>{}</span>            {/* user name */}
            <div>
                <div>
                    <span>Following</span>
                    <span>{}</span>    {/* Number of following */}
                </div>
                <div>
                    <span>Followers</span>
                    <span>{}</span>    {/* Number of followers */}
                </div>
            </div>
            <div>
                <div>
                    <span>To Read</span>
                    <span>{}</span>    {/* Number of to read */}
                </div>
                <div>
                    <span>Reading</span>
                    <span>{}</span>    {/* Number of reading */}
                </div>
                <div>
                    <span>Read</span>
                    <span>{}</span>    {/* Number of read */}
                </div>
            </div>
            <span>Your Profile</span>
        </div>
    );
};

export default MiniProfile;