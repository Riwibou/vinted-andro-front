import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      handleToken(response.data.token);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <h1>Se connecter</h1>
      <form className="formulaire" onSubmit={handleSubmit}>
        <div className="form-group">
          <label></label>
          <input
            placeholder="Adresse email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label></label>
          <input
            placeholder="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <div className="form-group">
          <button className="btn-to-login" type="submit">
            Se connecter
          </button>
        </div>
      </form>
      <p className="inscrire">
        Pas encore de compte ?
        <span>
          <Link to="/signup"> Inscris-toi !</Link>
        </span>
      </p>
    </div>
  );
};

export default Login;
