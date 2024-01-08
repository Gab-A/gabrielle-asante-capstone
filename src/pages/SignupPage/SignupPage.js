import Input from "../../components/Input/Input";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import brandLogo from "../../assets/logo/vibe-scribe-3.svg";
import "../LoginPage/LoginPage.scss";

export default function SignupPage() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:8000/auth/register", {
        first_name: event.target.first_name.value,
        last_name: event.target.last_name.value,
        email: event.target.email.value,
        password: event.target.password.value,
      });

      navigate("/login");
    } catch (error) {
      console.error(error);
      setError(error.response.data);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-page__logo">
        <img src={brandLogo}></img>
      </div>
      <div className="auth-page__form">
        <h3 className="auth-page__title">
          Create a free{" "}
          <span className="auth-page__title-name">VibeScribe</span> account
        </h3>
        <form className="auth" onSubmit={handleSubmit}>
          <Input type="text" name="first_name" placeholder="First Name" />
          <Input
            type="text"
            name="last_name"
            label="Last name"
            placeholder="Last Name"
          />
          <Input
            type="text"
            name="email"
            label="Email"
            placeholder="Email address"
          />
          <Input
            type="password"
            name="password"
            label="Password"
            placeholder="Password"
          />

          <button className="auth__button">Sign up</button>

          {error && <div className="auth__message">{error}</div>}
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login" className="auth__login">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
