import React from 'react';
import "../../index.css";
import "./header.css";
import { Logo } from "../../assets/index.js";
import { LINK_LIST } from "../../pages/index.js";
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const userName = "Tony";

  return (
    <>
      <nav className="main-nav">
        <a className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src={Logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          {location.pathname === LINK_LIST.User ? (
            <>
              <Link to={LINK_LIST.User} className="main-nav-item">
                {userName}
              </Link>
              <Link to={LINK_LIST.Home} className="main-nav-item">Sign Out</Link>
            </>
          ) : (
            <Link to={LINK_LIST.Logging} className="main-nav-item">Sign In</Link>
          )}
        </div>
      </nav>
    </>
  );
}

export default Header;
