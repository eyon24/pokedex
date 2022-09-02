import "../css/header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="header-container">
      <div className="links">
        <Link className="link" to="/">
          POKEDEXUSSY
        </Link>
      </div>
    </nav>
  );
};

export default Header;
