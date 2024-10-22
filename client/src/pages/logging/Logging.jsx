import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./logging.css"

function Logging() {
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Pour afficher le message d'erreur
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

    return await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    }).then((resp) => resp.json());
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await loginRequest();
      if (response.error) {
        animationFailed();
        setErrorMessage("Identifiants Incorrects.");
      } else {
        const token = response.body.token;
        sessionStorage.setItem("token", token);
        if (rememberMe) {
          localStorage.setItem("token", token);
        }
        dispatch({ type: "LOGIN_SUCCESS" });
        navigate("/profile");
      }
    } catch (error) {
      animationFailed();
      setErrorMessage("Identifiants Incorrects.");
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

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

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
            onClick={handleLogin}
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
