import { useState } from "react";
import axios from "axios";
import "../styles/Form.css";

const RegisterForm = (props) => {
  const { setCurrentUser, setRegisterSelected } = props;

  const name = "Alice Johnson";
  const email = "alice.johnson@example.com";
  const password = "password";
  const confirmPassword = "password";
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // sending request to backend with existing data to login route
      const response = await axios.post(
        "http://localhost:3001/api/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      setMessage(response.data.notice);
      setCurrentUser(response.data.user);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.alert);
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="form-container">
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="name" id="name" value={name} />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} />
        <label htmlFor="confirm_password">Confirm Password</label>
        <input type="password" id="confirm_password" value={confirmPassword} />
        <button type="submit">Register</button>
        <button
          type="button"
          className="back-button"
          onClick={() => setRegisterSelected(false)}
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
