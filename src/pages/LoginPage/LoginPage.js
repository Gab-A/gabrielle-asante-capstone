import "./LoginPage.scss";
import axios from "axios";
import { useState } from "react";
import Input from "../../components/Input/Input";
import { useNavigate, Link } from "react-router-dom";

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
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(error.response.data);
    }
  };

  return (
    <main className="login-page">
      <p>I am the login page.</p>
      <form className="login" onSubmit={handleSubmit}>
        <h1 className="login__title">Log in</h1>
        <Input type="text" name="email" label="Email" placeholder="Email" />
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Password"
        />
        <button className="login__button">Log in</button>
        {error && <div className="login__message">{error}</div>}
      </form>

      <p>
        Need an account?{" "}
        <Link to="/signup" className="login__signup">
          Sign up
        </Link>
      </p>
    </main>
  );
}
