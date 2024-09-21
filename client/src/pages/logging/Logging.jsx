import React from 'react';
import "../../index.css";
import { LINK_LIST } from '../../pages/index.js';
import { Link } from 'react-router-dom';

function Logging() {
  return (
    <>
    <main class="main bg-dark">
      <section class="sign-in-content">
        <i class="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div class="input-wrapper">
            <label for="username">Username</label>
            <input type="text" id="username" required/>
          </div>
          <div class="input-wrapper">
            <label for="password">Password</label>
            <input type="password" id="password" required/>
          </div>
          <div class="input-remember">
            <input type="checkbox" id="remember-me" required/>
            <label for="remember-me">Remember me</label>
          </div>
          <Link to={LINK_LIST.User} className="sign-in-button">Sign In</Link>
        </form>
      </section>
    </main>
    </>
  );
}

export default Logging;
