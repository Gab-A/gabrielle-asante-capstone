import "./LoginPage.scss";
import axios from "axios";
import { useState } from "react";
import Input from "../../components/Input/Input";
import { useNavigate, Link } from "react-router-dom";
import lockIcon from "../../assets/icons/lock.svg";
import mailIcon from "../../assets/icons/mail.svg";
import brandLogo from "../../assets/logo/vibe-scribe-3.svg";

export default function LoginPage() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        email: event.target.email.value,
        password: event.target.password.value,
      });

      sessionStorage.setItem("token", response.data.token);
      navigate("/profile");
    } catch (error) {
      console.error(error);
      setError(error.response.data);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-page__logo-container">
        <img src={brandLogo} className="login-page__logo"></img>
      </div>
      <div className="auth-page__form">
        <h3 className="auth-page__title">
          Log into your{" "}
          <span className="auth-page__title-name">VibeScribe</span> account
        </h3>
        <form className="auth" onSubmit={handleSubmit}>
          {/* <h1 className="login__title">Log in</h1> */}
          <Input
            type="text"
            name="email"
            label="Email"
            placeholder="Email"
            image={mailIcon}
          />
          {error && <div className="auth__error-message">{error}</div>}
          <Input
            type="password"
            name="password"
            label="Password"
            placeholder="Password"
            image={lockIcon}
          />
          {error && <div className="auth__error-message">{error}</div>}

          <button className="auth__button">Log in</button>
          {/* {error && <div className="login__message">{error}</div>} */}
        </form>

        <p>
          Need an account?{" "}
          <Link to="/signup" className="auth__signup">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
