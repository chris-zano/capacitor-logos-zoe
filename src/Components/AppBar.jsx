import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logoImage from '/src/assets/images/logo.png';
import { NavLink } from 'react-router-dom';

const AppBarComponent = () => {
  return (
    <header id="header_top_navbar">
      <div className="app-bar">
        <a href="/profile" className="user-icon-btn">
          <FontAwesomeIcon icon="circle-user" />
        </a>
        <NavLink to="/" className="logo-title">
          <img src={logoImage} alt="Logo" className="logo" />
          <h1 className="title">THE <span>LOGOS-ZOE</span></h1>
        </NavLink>
        <div className="header_actions">
          <a href="/search" className="search-icon">
            <FontAwesomeIcon icon="magnifying-glass" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default AppBarComponent;
