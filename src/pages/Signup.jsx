import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!username.trim()) {
      errors.username = "Please enter a username.";
    }

    if (!email.trim()) {
      errors.email = "Please enter an email address.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!password.trim()) {
      errors.password = "Please enter a password.";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/signup",
          {
            email: email,
            username: username,
            password: password,
            newsletter: newsletter,
          }
        );
        console.log(response.data.token);
        handleToken(response.data.token);
        navigate("/");
      } catch (error) {
        console.log(error.response.status);
      }
    }
  };

  return (
    <div className="signup-container">
      <h1>S&apos;inscrire</h1>
      <form className="formulaire" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={errors.username ? "error" : ""}
          />{" "}
        </div>
        {errors.username && <p className="error-message">{errors.username}</p>}

        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? "error" : ""}
          />
        </div>
        {errors.email && <p className="error-message">{errors.email}</p>}

        <div className="form-group">
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? "error" : ""}
          />
        </div>
        {errors.password && <p className="error-message">{errors.password}</p>}

        <div className="form-group check">
          <input
            type="checkbox"
            checked={newsletter}
            onChange={() => setNewsletter(!newsletter)}
          />
          <label className="check-label">
            S&apos;inscrire à notre newsletter
          </label>
        </div>
        <h6>
          En m&apos;inscrivant je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </h6>

        <button className="btn-to-login" type="submit">
          S&apos;inscrire
        </button>
      </form>
      <p className="inscrire">
        <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
      </p>
    </div>
  );
};

export default Signup;
