
import React, { useState } from 'react';
import BookList from '../components/BookList';
import UserList from '../components/UserList';
import { Container, Col, Image, Row } from 'react-bootstrap';

// import { useUserById } from '../helpers/hooks/apiData/useUserData'; //uncomment when user info is setup properly

const Profile = (props) => { // userId, replace user once properly set up.
    // const { user, loading, error } = useUserById(userId);
    const { currentUser, wantToRead, reading, read, favBooks } = props
    const [selectedOption, setSelectedOption] = useState('To Be Read');

    console.log('want to read:', wantToRead);
    console.log('reading:', reading);
    console.log('read:', read);
    console.log('fav:', favBooks);

    const handleSelectOption = (option) => {
        setSelectedOption(option);
    };

    const renderBookList = () => {
        switch (selectedOption) {
            case 'To Be Read':
                return wantToRead.length > 0 ? (
                    <div><BookList books={wantToRead} currentUser={currentUser} /></div>
                ) : (
                    <div>No books to be read</div>
                );
            case 'Reading':
                return reading.length > 0 ? (
                    <div><BookList books={reading} currentUser={currentUser} /></div>
                ) : (
                    <div>No books currently being read</div>
                );
            case 'Read':
                return read.length > 0 ? (
                    <div><BookList books={read} currentUser={currentUser} /></div>
                ) : (
                    <div>No books read</div>
                );
            case 'My Books':
                return favBooks.length > 0 ? (
                    <div><BookList books={favBooks} currentUser={currentUser} /></div>
                ) : (
                    <div>No favorite books</div>
                );
            case 'Followers List':
                const followersList = currentUser.followers_list;
                return followersList.length > 0 ? (
                    <div><UserList users={followersList} currentUser={currentUser} /></div>
                ) : (
                    <div>No followers</div>
                );
            case 'Following List':
                const followingList = currentUser.following_list;
                return followingList.length > 0 ? (
                    <div><UserList users={followingList} currentUser={currentUser} /></div>
                ) : (
                    <div>No followers</div>
                );
            default:
                return null;
        }
    };

    //uncomment when user info is properly setup
    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error.message}</div>;

    return (
        <Container>
            <Row>
                <Image src="holder.js/100px250" fluid />;
                <h1>Profile</h1>
            </Row>

            {/* Left side of page */}
            <Col xs={6} md={4}>
                <Image src="holder.js/171x180" thumbnail />
                <h2>{currentUser?.name}</h2>
                <div className="follow">
                    <h3>Followers</h3>
                    <span>{currentUser?.followers}</span>
                    <h3>Following</h3>
                    <span>{currentUser?.following}</span>
                </div>
                <div className="row">
                    <div className="list-group">
                        <a href="#" className="list-group-item list-group-item-action" onClick={() => handleSelectOption('To Be Read')}>
                            To Be Read
                        </a>
                        <a href="#" className="list-group-item list-group-item-action" onClick={() => handleSelectOption('Reading')}>
                            Reading
                        </a>
                        <a href="#" className="list-group-item list-group-item-action" onClick={() => handleSelectOption('Read')}>
                            Read
                        </a>
                        <a href="#" className="list-group-item list-group-item-action" onClick={() => handleSelectOption('My Books')}>
                            My Books
                        </a>
                    </div>
                </div>
            </Col>

            {/* Middle of page */}
            <Col>
                {renderBookList()}
            </Col>

            {/* Right side of page  */}
            <Row>
                <Col>
                    Popular Books
                </Col>
                <Col>
                    <a href="#" onClick={() => handleSelectOption('Followers List')}>
                        Followers List
                    </a>
                    <a href="#" onClick={() => handleSelectOption('Following List')}>
                        Following List
                    </a>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
