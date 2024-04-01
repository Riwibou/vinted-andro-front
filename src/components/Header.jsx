import { Link } from "react-router-dom";
import Switcher from "./Switch";

const Header = ({ token }) => {
  return (
    <div className="center">
      <header className="container-header">
        <div className="header-logo">
          <Link to="/">
            <img src="logo.png" alt="logo-vinted" />
          </Link>
        </div>

        <div className="header-middle">
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
          </div>

          <div className="header-filter">
            <div className="filter-toogle">
              <Switcher />
            </div>
            <div className="filter-range"></div>
          </div>
        </div>

        <div>
          <nav className="nav">
            <ul>
              {token ? (
                <button> Deconnexion </button>
              ) : (
                <>
                  <li>
                    <Link className="login-btn" to="/login">
                      <p>Se connecter</p>
                    </Link>
                  </li>
                  <li>
                    <Link className="signup-btn" to="/signup">
                      <p>S&apos;inscrire</p>
                    </Link>
                  </li>
                </>
              )}
              {token ? (
                <li>
                  <Link className="selling-btn" to="/selling">
                    Vends tes articles
                  </Link>
                </li>
              ) : (
                <li>
                  <Link className="selling-btn" to="/login">
                    Vends tes articles
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
