import React, { useState } from 'react';
import { Container, Col, Image, Row } from 'react-bootstrap';
// import { useUserById } from '../helpers/hooks/apiData/useUserData'; //uncomment when user info is setup properly

const Profile = ({ user }) => { // userId, replace user once properly set up.
  // const { user, loading, error } = useUserById(userId);
  const [selectedOption, setSelectedOption] = useState('To Be Read');

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  const renderBookList = () => {
    switch (selectedOption) {
      case 'To Be Read':
        return <div>List of books to be read</div>; // Replace with actual list
      case 'Reading':
        return <div>List of books currently reading</div>; // Replace with actual list
      case 'Read':
        return <div>List of books read</div>; // Replace with actual list
      case 'My Books':
        return <div>List of my books</div>; // Replace with actual list
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
        <h2>{user.name}</h2>
        <div className="follow">
          <h3>Followers</h3>
          <span>{user.followers}</span>
          <h3>Following</h3>
          <span>{user.following}</span>
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
       Followers List
       Following List
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
