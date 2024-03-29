import { Link } from "react-router-dom";
import Cookies from "react-router-dom";



const Header = ({token}) => {
  return (
    <header className="container">
      <div className="header-logo">
        <div className="logo">
          <Link to="/"><img src="/static/media/logo.10b0caad793dd0a8ea72.png" alt="" /></Link>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/selling">Vends tes articles</Link>
            </li>

            {token ? (

            <button> Deconnexion </button>
            ) : (
            <>
            <li>
              <Link to="/login">
                <button>Login</button>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <button>Sign-up</button>
              </Link>
            </li>
            </>
            )
            }
          </ul>
        </nav>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button type="submit">Search</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
