import { useState } from "react";
import axios from "axios";

const LoginForm = (props) => {
    // const { email, setEmail, password, setPassword, login } = props;
    // email, password are states to store login input, login is a function that is called when login is clicked

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3001/api/login', {
            email,
            password
          }, { withCredentials: true });
          
          setMessage(response.data.notice);
        } catch (error) {
          if (error.response) {
            setMessage(error.response.data.alert);
          } else {
            setMessage('An error occurred. Please try again.');
          }
        }
    };

    return(
        <div>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;