// initial pre-logged in page- children: login, register
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Homepage = ({
  loginSelected,
  registerSelected,
  setLoginselected,
  setRegisterSelected,
  setUser
}) => {
  return (
    <div>
      <img
        src="https://media.gettyimages.com/id/2060039749/photo/cheerful-women-having-fun-while-laughing-at-home.jpg?s=612x612&w=0&k=20&c=Y7SZE2BOglZzEfjYFMXdXM_D6Quam0CV_FooGX3s0DQ="
        alt="happy friends reading together"
      />
      <div>
        {!loginSelected && !registerSelected && (
          <>
            <h1>Discover and share your reading journey with others.</h1>
            <h2>
              At Readr, we believe that books have the power to inspire,
              entertain, and educate. Whether you're a lifelong readr or just
              getting started, our platform helps you track the books you've
              read, rate and review them, and explore what others are reading.
              Join our community of book enthusiasts today and start your
              literary adventure with Readr. <br /> Happy reading!
            </h2>
            <h1
              onClick={() => {
                setLoginselected(true);
              }}
            >
              Already a member? Log in
            </h1>
            <h1
              onClick={() => {
                setRegisterSelected(true);
              }}
            >
              Sign up
            </h1>
          </>
        )}
        {loginSelected && <LoginForm setUser={setUser} />}
        {registerSelected && <RegisterForm setUser={setUser} />}
      </div>
      <img
        src="https://media.gettyimages.com/id/1398466630/photo/bearded-man-comfortably-sitting-on-a-coach-reading-a-book-and-holding-his-dog.jpg?s=612x612&w=0&k=20&c=UyGpkOSp1ucynHrhJvC2jE1Ura9c2rkHkT03uP2-_54="
        alt="man reading with his dog"
      />
    </div>
  );
};

export default Homepage;
