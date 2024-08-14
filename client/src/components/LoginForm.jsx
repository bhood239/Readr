import { useState } from "react";
import axios from "axios";
import "../styles/Form.css";

const LoginForm = (props) => {
  const { setCurrentUser, setLoginSelected } = props;

  const email = "alice.johnson@example.com";
  const password = "password";
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      setMessage("Logged in Successfully");
      setCurrentUser(response.data.user);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.alert);
      } else {
        setMessage("An error occurred. Please try again.");
        console.log(error);
      }
    }
  };

  return (
    <div className="form-container">
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} />
        <button type="submit">Login</button>
        <button
          type="button"
          className="back-button"
          onClick={() => setLoginSelected(false)}
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
