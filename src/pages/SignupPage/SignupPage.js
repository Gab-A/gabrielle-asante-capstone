import "./SignupPage.scss";
import Input from "../../components/Input/Input";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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
    <main className="signup-page">
      <form className="signup" onSubmit={handleSubmit}>
        <h2 className="signup__title">Create a free VibeScribe account</h2>

        <Input
          type="text"
          name="first_name"
          // label="First name"
          placeholder="First Name"
        />
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
          placeholder="Password (8+ characters)"
        />

        <button className="signup__button">Sign up</button>

        {error && <div className="signup__message">{error}</div>}
      </form>

      <p>
        Already have an account?{" "}
        <Link to="/login" className="signup__login">
          Log in
        </Link>
      </p>
    </main>
  );
}
