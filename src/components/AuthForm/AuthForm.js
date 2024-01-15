import Input from "../Input/Input";
import brandLogo from "../../assets/logo/vibe-scribe-3.svg";
import mailIcon from "../../assets/icons/mail.svg";
import lockIcon from "../../assets/icons/lock.svg";
import { Link, useLocation } from "react-router-dom";
import "./AuthForm.scss";

export default function AuthForm({
  handleSubmit,
  signupError,
  // loginError,
  errors,
  // password,
  email,
}) {
  const location = useLocation();
  const isSignupPage = location.pathname === "/signup";
  const isLoginPage = location.pathname === "/login";

  return (
    <main className="auth-page">
      <div className="auth-page__wrapper">
        <div className="auth-page__logo-container">
          <img src={brandLogo} className="auth-page__logo"></img>
        </div>
        <div className="auth-page__details-wrapper">
          <div className="auth-page__details-welcome">
            <h2 className="auth-page__details-heading">
              {" "}
              {isLoginPage ? "Welcome Back" : "Get Started"}
            </h2>
            <p className="auth-page__details-subheading">
              {isLoginPage
                ? "Please enter your details to sign in."
                : "Please enter your details to sign up"}
            </p>
          </div>
          <form className="auth" onSubmit={handleSubmit}>
            <h4 className="auth__title">
              {isLoginPage ? "Log into your " : "Create your free "}
              <span className="auth-page__details-brand-name">
                VibeScribe
              </span>{" "}
              account
            </h4>
            {/* <h1 className="login__title">Log in</h1> */}
            {isSignupPage && (
              <>
                <Input type="text" name="first_name" placeholder="First Name" />
                {signupError && (
                  <div className="auth__error-message">{signupError}</div>
                )}
                <Input
                  type="text"
                  name="last_name"
                  label="Last name"
                  placeholder="Last Name"
                />
                {signupError && (
                  <div className="auth__error-message">{signupError}</div>
                )}
              </>
            )}
            <Input
              type="text"
              name="email"
              label="Email"
              placeholder="Email"
              value={email}
              // mailIcon={mailIcon}
            />
            {isLoginPage
              ? errors && (
                  <div className="auth__error-message">{errors.email}</div>
                )
              : signupError && (
                  <div className="auth__error-message">{signupError}</div>
                )}
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Password"
              // image={lockIcon}
            />
            {isLoginPage
              ? errors && (
                  <div className="auth__error-message">{errors.password}</div>
                )
              : signupError && (
                  <div className="auth__error-message">{signupError}</div>
                )}
            <div className="auth__button-container">
              <button className="auth__button">
                {" "}
                {isSignupPage ? "Sign Up" : "Login"}{" "}
              </button>
            </div>
            {/* {error && <div className="login__message">{error}</div>} */}
          </form>
          <p className="auth__text">
            {isLoginPage ? "Need an account?" : "Have an account already?"} {""}
            {isLoginPage ? (
              <Link to="/signup" className="auth__link">
                Signup
              </Link>
            ) : (
              <Link to="/login" className="auth__link">
                Login
              </Link>
            )}
          </p>
        </div>
      </div>
    </main>
  );
}
