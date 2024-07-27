
const LoginForm = (props) => {
    const { email, setEmail, password, setPassword, login } = props;
    // email, password are states to store login input, login is a function that is called when login is clicked

    return(
        <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit" onClick={() => login()}>Login</button>
        </div>
    );
};

export default LoginForm;