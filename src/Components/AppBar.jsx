import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logoImage from "/src/assets/images/logo.png";
import { NavLink } from "react-router-dom";

const AppBarComponent = () => {

  return (
    <header id="header_top_navbar">
      <div className="app-bar">
        <NavLink to="/profile" className="user-icon-btn">
          <FontAwesomeIcon icon="circle-user" />
        </NavLink>
        <NavLink to="/" className="logo-title">
          <img src={logoImage} alt="Logo" className="logo" />
          <h1 className="title">
            <span id="the">THE</span> <span id="t-title">LOGOS-ZOE</span>
          </h1>
        </NavLink>
        <div className="header_actions">
          <NavLink to="/search" className="search-icon">
            <FontAwesomeIcon icon="magnifying-glass" />
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default AppBarComponent;
