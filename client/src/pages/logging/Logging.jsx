import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./logging.css"

function Logging() {
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const passwordInput = useRef();
  const usernameInput = useRef();
  const loginButton = useRef();
  const isLoggedIn = useSelector((state) => state.log.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // VERIFY IF LOGGED //
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [isLoggedIn, navigate]);

  async function loginRequest() {
    const loginForm = {
      email: usernameInput.current.value,
      password: passwordInput.current.value,
    };
    const payload = JSON.stringify(loginForm);

    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      });

      if (!response.ok) {
        return response;
      }

      return await response.json();
    } catch (error) {
      throw new Error("NetworkError");
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      const response = await loginRequest();
      const data = await response.json();
      const token = data.body.token;
      sessionStorage.setItem("token", token);
      if (rememberMe) {
        localStorage.setItem("token", token);
      }
      dispatch({ type: "LOGIN_SUCCESS" });
      navigate("/profile");
    } catch (error) {
      if (error.message === "NetworkError") {
        setErrorMessage("Erreur réseau, impossible de joindre le serveur.");
      } else {
        setErrorMessage("Identifiants incorrects.");
      }
      animationFailed();
    }
  };

  function animationFailed() {
    passwordInput.current.classList.add("loginFailed");
    usernameInput.current.classList.add("loginFailed");
    window.setTimeout(function () {
      passwordInput.current.classList.remove("loginFailed");
      usernameInput.current.classList.remove("loginFailed");
    }, 500);
  }

  return (
    <main className="main">
      <section className="sign-in-content bg-dark">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" required ref={usernameInput} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required ref={passwordInput} />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button
            className="sign-in-button"
            id="sign-in-button"
            ref={loginButton}
          >
            Sign In
          </button>
        </form>
        {errorMessage && (
          <div className="error-box">
            <p>{errorMessage}</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default Logging;