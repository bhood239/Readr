// initial pre-logged in page- children: login, register
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import "../styles/Homepage.css";

const Homepage = ({
  loginSelected,
  registerSelected,
  setLoginSelected,
  setRegisterSelected,
  setCurrentUser,
}) => {
  return (
    <div className="homepage">
      <img
        className="homepage pic left"
        src="https://miro.medium.com/v2/resize:fit:4800/format:webp/1*42ebJizcUtZBNIZPmmMZ5Q.jpeg"
        alt="open book"
      />

      <div className="homepage content">
        {!loginSelected && !registerSelected && (
          <>
            <h1 className="homepage slogan">
              Discover and share your reading journey with others.
            </h1>
            <h2 className="homepage welcome-text">
              Join our community of book enthusiasts today and start your
              literary adventure with Readr. <br /> Happy reading!
            </h2>
            <h1
              className="homepage login nav-link"
              onClick={() => {
                setLoginSelected(true);
                setRegisterSelected(false);
              }}
            >
              Already a member? Log in
            </h1>
            <h1
              className="homepage register nav-link"
              onClick={() => {
                setRegisterSelected(true);
                setLoginSelected(false);
              }}
            >
              Register
            </h1>
          </>
        )}
        {loginSelected && (
          <LoginForm
            setCurrentUser={setCurrentUser}
            setLoginSelected={setLoginSelected}
          />
        )}
        {registerSelected && (
          <RegisterForm
            setCurrentUser={setCurrentUser}
            setRegisterSelected={setRegisterSelected}
          />
        )}
      </div>
      <img
        className="homepage pic right"
        src="https://media.gettyimages.com/id/2060039749/photo/cheerful-women-having-fun-while-laughing-at-home.jpg?s=612x612&w=0&k=20&c=Y7SZE2BOglZzEfjYFMXdXM_D6Quam0CV_FooGX3s0DQ="
        alt="happy friends reading together"
      />
    </div>
  );
};

export default Homepage;
