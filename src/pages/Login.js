import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/store";

const mainUrl = "http://167.99.138.67:1111/";

function Login() {
  const { username, setUsername, setIsLoggedIn, setSecretKey } = useStore();
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name: username,
      password,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    fetch(mainUrl + "login", options)
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          setErrorMessage(data.message);
        } else {
          setSecretKey(data.secretKey);
          setUsername(username);
          setIsLoggedIn(true);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage("An error occurred. Please try again.");
      });
  };

  return (
    <div>
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              type="text"
              name=""
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required=""
            />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required=""
            />
            <label>Password</label>
          </div>
          <center>
            <button type="submit" className="register-button">
              LOGIN
              <span></span>
            </button>
          </center>
          {errorMessage && (
            <div
              className="d-flex justify-content-center"
              style={{ color: "red", marginBottom: "10px" }}
            >
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
