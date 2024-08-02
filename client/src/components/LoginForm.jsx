import { useState } from "react";
import axios from "axios";

const LoginForm = (props) => {
    const { setUser } = props;

    const email = 'userone@example.com';
    const password = 'password';
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3001/api/login', {
            email,
            password
          }, { withCredentials: true });
          
        setMessage('Logged in Successfully');
        setUser(response.data.user);
        // setUser(response);
        } catch (error) {
          if (error.response) {
            setMessage(error.response.data.alert);
            console.log(error);
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
                <input type="email" id="email" value={email} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;